let screenDisplay = "0";
let runningTotal = 0;
let previousOperator = null;
let newNum = true;
const screen = document.querySelector(".screen-display");

document.querySelector(".keypad").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(num) {
  if (screenDisplay === "0" || newNum === true) {
    screenDisplay = num;
  } else {
    screenDisplay += num;
  }
  newNum = false;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "AC":
      screenDisplay = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "←":
      if (screenDisplay.length === 1) {
        screenDisplay = "0";
      } else {
        screenDisplay = screenDisplay.substring(0, screenDisplay.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      computeOperation(parseInt(screenDisplay));
      newNum = true;
      previousOperator = null;
      runningTotal = 0;
      break;
    default:
      calculateRunningTotal(symbol);
      newNum = true;
  }
}

function calculateRunningTotal(symbol) {
  if (runningTotal === 0) {
    runningTotal = parseInt(screenDisplay);
  } else {
    computeOperation(parseInt(screenDisplay));
  }
  console.log("symbol = " + symbol);
  previousOperator = symbol;
}

function computeOperation(screenNum) {
  if (previousOperator === "+") {
    runningTotal += screenNum;
  } else if (previousOperator === "−") {
    runningTotal -= screenNum;
  } else if (previousOperator === "x") {
    runningTotal *= screenNum;
  } else {
    runningTotal /= screenNum;
  }
  screenDisplay = "" + runningTotal;
}

function rerender() {
  screen.innerText = screenDisplay;
}
