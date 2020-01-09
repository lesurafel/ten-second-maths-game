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

  if (operatorList.length !== 0) {
    operator.innerHTML = operatorList[operatorIndex - 1];
  }

  if (operator.innerHTML === '-') {
    if (num1 < num2) {
      var temp = num2;
      num2 = num1;
      num1 = temp;
    }
  } else if (operator.innerHTML === '/') {
    num1 *= num2;
  }
  firstNum.innerHTML = num1;
  secondNum.innerHTML = num2;
}

var calculateTwoNum = function(answer) {
  var firstNum = document.getElementById("firstNum");
  var secondNum = document.getElementById("secondNum");
  var operator = document.getElementById("operator");

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
    assignNumber();
  });

  var count;
  var timer;
  var start = false;
  var score = 0;
  var timeout;
  var answer;

  var startTimer = function () {
    timer = setInterval(function () {
      document.getElementById("timeLeft").innerHTML = Number(document.getElementById("timeLeft").innerHTML) - 1;
      if (Number(document.getElementById("timeLeft").innerHTML) < 0) {
        clearInterval(timer);
        timeLeft.innerHTML = 10;
        start = false;
        document.getElementById("answer").value = '';
        setHighScore();
        score = 0;
      }
    }, 1000);
  }

  $(document).on('input', '#answer', function (event) {
    if (start === false) {
      document.getElementById("currentScore").innerHTML = '';
      start = true;
      startTimer();
    }
    var timeLeft = document.getElementById("timeLeft");
    count = Number(timeLeft.innerHTML);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      answer = Number(document.getElementById("answer").value);
      if(calculateTwoNum(answer)) {
        timeLeft.innerHTML = count + 1;
        score = Number(document.getElementById("currentScore").innerHTML);
        document.getElementById("currentScore").innerHTML = score + 1;
        document.getElementById("answer").value = '';
        assignNumber();
      }
    }, 300);
  });

  assignNumber();
});
