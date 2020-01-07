var operatorList = ['+'];
var generateNum = function (size) {
  var num = Math.floor(Math.random() * size + 1);
  return num;
}

var assignNumber = function () {
  var limiteNum = document.getElementById("numLimite").innerHTML;

  var num1 = generateNum(Number(limiteNum));
  var operatorIndex = generateNum(operatorList.length);
  var num2 = generateNum(Number(limiteNum));

  var firstNum = document.getElementById("firstNum");
  var secondNum = document.getElementById("secondNum");
  var operator = document.getElementById("operator");

  firstNum.innerHTML = num1;
  operator.innerHTML = operatorList[operatorIndex - 1];
  secondNum.innerHTML = num2;
}

$(document).ready(function(){
  assignNumber();
});
