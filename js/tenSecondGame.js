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

var calculateTwoNum = function() {
  var firstNum = document.getElementById("firstNum");
  var secondNum = document.getElementById("secondNum");
  var operator = document.getElementById("operator");
  var answer = Number(document.getElementById("answer").value);
  switch (operator.innerHTML) {
    case '+':
      return (Number(firstNum.innerHTML) + Number(secondNum.innerHTML) === answer);
      break;
    case '-':
      return (Number(firstNum.innerHTML) - Number(secondNum.innerHTML) === answer);
      break;
    case '*':
      return (Number(firstNum.innerHTML) * Number(secondNum.innerHTML) === answer);
      break;
    default:
      return (Number(firstNum.innerHTML) / Number(secondNum.innerHTML) === answer);
  }
}

var setHighScore = function () {
  if ((Number(document.getElementById("currentScore").innerHTML)) > (Number(document.getElementById("highScore").innerHTML))) {
    document.getElementById("highScore").innerHTML = document.getElementById("currentScore").innerHTML;
  }
}

$(document).ready(function(){

  $(document).on('mousemove', '.slider', function (event) {
    event.stopPropagation();
    var limiteNum = document.getElementById("numLimite")
    limiteNum.innerHTML = this.value;
  });

  $(document).on('click', 'li', function (event) {
    if (operatorList.includes($(this).data('id'))) {
      operatorList.splice(operatorList.indexOf($(this).data('id')), 1);
    } else {
      operatorList.push($(this).data('id'));
    }
  });

  var count = 10;
  var timer;
  var start = false;
  var score = 0;

  $(document).on('input', '#answer', function (event) {
    if (start === false) {
      start = true;
      document.getElementById("currentScore").innerHTML = 0;
      var timeLeft = document.getElementById("timeLeft");
      var timer = setInterval(function () {
        if(calculateTwoNum()) {
          if (count < 10) {
            count += 1;
          }

          score = Number(document.getElementById("currentScore").innerHTML);
          document.getElementById("currentScore").innerHTML = score + 1;
          document.getElementById("answer").value = '';
          assignNumber();
        } else {
          count -= 1;
        } // End of if calculateTwoNum
      // ********** To stop Time interval ********
        if (count < 0) {
          clearInterval(timer);
          count = 10;
          start = false;
          document.getElementById("answer").value = '';
          setHighScore();
          score = 0;
        }

        timeLeft.innerHTML = count;
      }, 1000);
    } //End of if start === false
  });

  assignNumber();
});
