var operatorList = ['+'];
var count = 10;
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

  $(document).on('mousemove', '.slider', function (event) {
    event.stopPropagation();
    var limiteNum = document.getElementById("numLimite")
    limiteNum.innerHTML = this.value;

    var x = this.value;
    var color = 'linear-gradient(90deg, rgb(53, 59, 72)' + x + '%, rgb(53, 59, 72)' + x + '%)';
    this.background = color;
  });

  var answerTimeout;
  var timeLeftTimeout;
  $(document).on('input', '#answer', function (event) {

    var timeLeft = document.getElementById("timeLeft");
    var firstNum = document.getElementById("firstNum");
    var secondNum = document.getElementById("secondNum");
    var operator = document.getElementById("operator");
    var answer = Number(document.getElementById("answer").value);
    var result;
    clearTimeout(answerTimeout);
    answerTimeout = setTimeout(function () {
      //while (count < 11) {
        switch (operator.innerHTML) {
          case '+':
            result = Number(firstNum.innerHTML) + Number(secondNum.innerHTML);
            break;
          case '-':
            result = Number(firstNum.innerHTML) - Number(secondNum.innerHTML);
            break;
          case '*':
            result = Number(firstNum.innerHTML) * Number(secondNum.innerHTML);
            break;
          default:
            result = Number(firstNum.innerHTML) * Number(secondNum.innerHTML);
        }
        //alert(result === answer);
        if ( result === answer) {
          if (count < 10) {
            count += 1;
          }
          document.getElementById("answer").value = '';
        } else {
          count -= 1;
        }

        timeLeft.innerHTML = count;
      //} //End of while loop
    }, 1000);
  });

  assignNumber();
});
