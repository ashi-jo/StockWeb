var stockContainer = document.getElementById('stockContainer');
var addStockButton = document.getElementById('addStock');
var obj = document.getElementById("mySelect");
var moreThan4Warning = document.getElementById('demoF');
var alreadyAdded = document.getElementById('alreadyAdded');
var atleastOne = document.getElementById('atleastOne');

var compareButton = document.getElementById('compare');

moreThan4Warning.style.display= "none";
alreadyAdded.style.display = "none";
atleastOne.style.display="none";

var stocks = [];


if(addStockButton){
  addStockButton.addEventListener('click', function(){
    moreThan4Warning.style.display= "none";
    alreadyAdded.style.display = "none";
    atleastOne.style.display="none";

    var stockName = obj.options[obj.selectedIndex].text;

    if(stocks.length<4 && !stocks.includes(stockName)){
      var para = document.createElement('p');
      para.innerText = stockName;
      para.classList.add('stockPara');

      var delButton = document.createElement('button');
      delButton.innerHTML+= '<i class="fa fa-trash-o"></i>';
      delButton.classList.add('cancelButton');
      delButton.onclick = function(){
        console.log(stocks);
        var toDel = stocks.indexOf(stockName);
        stocks.splice(toDel,1);
        console.log(stocks);
        para.parentNode.removeChild(para);

        moreThan4Warning.style.display= "none";
        alreadyAdded.style.display = "none";
      }
      
      para.appendChild(delButton);
      stockContainer.appendChild(para);
      stocks.push(stockName);
      console.log(stocks);
    }
    else if(stocks.length>=4){
      moreThan4Warning.style.display="block";
    }
    else{
      alreadyAdded.style.display="block";
    }
  })
  
}

compareButton.addEventListener('click',function(){
  if(stocks.length==0){
    atleastOne.style.display="block";
  }
  else{
    var stockPass = stocks.toString();
    location.href="stockCompare/"+stockPass;
    // location.href="compare.html";
  }
})


// console.log('here');
// deleteStock.addEventListener('click', function(){
//   var toDelStock = this.parentElement.innerText;
//   console.log(toDelStock);
// })











// var x = 0;
// var stockContainer = document.getElementById('stockContainer');
// var addStockButton = document.getElementById('addStock');
// var obj = document.getElementById("mySelect");
// var moreThan4Warning = document.getElementById('demoF');

// moreThan4Warning.style.display= "none";

// const stocks = [];
// console.log('hi');

// // if(addStockButton == null){
// //   console.log('this shit is null bitch!');
// // }
// // function getOption() {
//   // var obj = document.getElementById("mySelect");
//   // document.getElementById("demo"+x).innerHTML = 
//   // obj.options[obj.selectedIndex].text;
//   // console.log('here');
//   // x++;
//   // if(x>4){
//   //   document.getElementById("demoF").innerHTML = "Cannot compare more than four stocks!";
//   // }
// //   console.log('im in here');
// //   var para = document.createElement('p');
// //   para.innerText = obj.options[obj.selectedIndex].text;
// //   stockContainer.appendChild(para);
// //   console.log('done');
// // }


// if(addStockButton){
//   addStockButton.addEventListener('click', function(){
//     console.log('im here');
//     x++;
//     if(x<=4){
//     var para = document.createElement('p');
//     para.innerText = obj.options[obj.selectedIndex].text;
//     stockContainer.appendChild(para);
//     stocks.push(obj.options[obj.selectedIndex].text);
//     console.log(stocks);
//     }
//     else{
//       moreThan4Warning.style.display="block";
//     }
//   })
// }

// function clickedTp(){
//   console.log('clicked TP');
// }