from flask import Flask, request, render_template
from bs4 import BeautifulSoup
import requests

nifty_50 = 'https://www.moneycontrol.com/markets/indian-indices/top-nse-50-companies-list/9?classic=true'

nifty_50_list = requests.get(nifty_50).text
soup = BeautifulSoup(nifty_50_list, 'lxml')

ind={}
nifty_50=soup.find('div', attrs={"id": "indices_stocks"})
indices=nifty_50.find('div', class_='indices')
for indices in indices.div.table.tbody.find_all('tr'):
    index=indices.td.p.a
    index_name=index.text
    # print(index_name)
    ind[index_name]={}
    ind[index_name]['index_url']=index['href']
    # print(index['href'])
    # indSoupreq = requests.get(index['href']).text
    # indSoup=BeautifulSoup(indSoupreq, 'lxml')
    # ind[index_name]['dataHref']=indSoup


    
    # print(ind)

# print(ind)

def getCompanydata(company_name,stockListData):
    stockListData[company_name]={}

    company_url = ind[company_name]['index_url']

    indSoupreq = requests.get(company_url).text
    indSoup=BeautifulSoup(indSoupreq, 'lxml')
    # stockListData[index_name]['dataHref']=indSoup


    #company overview
    c_overview = indSoup.find('div', class_ = 'morepls_cnt').text
    stockListData[company_name]['c_overview']=c_overview

    # cprice
    cprice_data = indSoup.find_all('input',attrs={"type":"hidden","id": "nprevclose"})
    cprice= cprice_data[0].attrs['value']
    stockListData[company_name]['cprice']=cprice

    #overview

    overview = indSoup.find_all('div', class_ = 'oview_table')
    otable2=overview[1]
    otable3=overview[2]
    otable4=overview[3]

    #mcap
    otable2 = otable2.table.tbody.find_all('tr')
    mcap_data=otable2[1]
    mcap = mcap_data.find_all('td')
    mcap = mcap[1].text
    stockListData[company_name]['mcap']=mcap
    # print(mcap)

    #other values
    otable3 = otable3.table.tbody.find_all('tr')
    for row in otable3:
        value = row.find_all('td')
        stockListData[company_name][value[0].text]=value[1].text

    otable4 = otable4.table.tbody.find_all('tr')
    for row in otable4:
        value = row.find_all('td')
        stockListData[company_name][value[0].text]=value[1].text


# getCompanydata('Adani Ports')
# print(stockListData)
    



app = Flask(__name__)
@app.route('/')
def index():
 return render_template('index.html', ind=ind)

@app.route('/stockCompare/<string:stocks>', methods=['GET','POST'])
def stockCompare(stocks):
 stocks = stocks.split(",")
 stockListData = {}
 for stock in stocks:
    getCompanydata(stock,stockListData)
 print(stockListData)
 return render_template('stockCompare.html', stockData=stockListData)

if __name__ == '__main__':
 app.run(debug=True)





#  <link rel="stylesheet" href="static/css/style.css">
# <script src="static/js/script.js"></script>