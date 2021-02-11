let screenDisplay = "0";
let runningTotal = 0;
let previousOperator = null;
let newNum = true;
const screen = document.querySelector(".screen-num");

document.querySelector(".keypad").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if (value === ".") {
    handleDecimalPoint();
  } else if (isNaN(parseFloat(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
    decreaseFontSize();
  }
  rerender();
}

function handleDecimalPoint() {
  if (screenDisplay.slice(-1) === ".") {
    return;
  }

  if (screenDisplay === "0" || newNum === true) {
    if (previousOperator === null) {
      screenDisplay += ".";
    } else {
      screenDisplay = "0.";
    }
  } else {
    screenDisplay += ".";
  }

  newNum = false;
}

function handleNumber(num) {
  if (screenDisplay.length > 35) {
    reset();
  }
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
      reset();
      break;
    case "←":
      if (screenDisplay.length === 1) {
        screenDisplay = "0";
      } else {
        screenDisplay = screenDisplay.substring(0, screenDisplay.length - 1);
      }
      increaseFontSize();
      break;
    case "%":
      screenDisplay /= 100;
    case "=":
      if (previousOperator === null) {
        return;
      }
      computeOperation(parseFloat(screenDisplay));
      newNum = true;
      previousOperator = null;
      runningTotal = 0;
      break;
    default:
      if (previousOperator === symbol) {
        return;
      }
      calculateRunningTotal(symbol);
      increaseFontSize();
      newNum = true;
  }
}

function calculateRunningTotal(symbol) {
  if (runningTotal === 0) {
    runningTotal = parseFloat(screenDisplay);
  } else {
    computeOperation(parseFloat(screenDisplay));
  }
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
  runningTotal = runningTotal.toFixed(6);
  console.log("running total = " + runningTotal);
  screenDisplay = "" + runningTotal;
  decreaseFontSize();
}

function rerender() {
  let output;

  if (screenDisplay[screenDisplay.length - 1] === ".") {
    output = "." + screenDisplay.slice(0, -1);
  } else {
    output = screenDisplay;
  }

  screen.innerText = output;
}

function reset() {
  screenDisplay = "0";
  runningTotal = 0;
  previousOperator = null;
  increaseFontSize();
}

function decreaseFontSize() {
  const display = document.querySelector(".screen-num");

  let fontSize = window.getComputedStyle(display).getPropertyValue("font-size");
  fontSize = parseFloat(fontSize.substring(0, fontSize.length - 2));

  while (display.scrollWidth > display.clientWidth && fontSize > 13) {
    fontSize -= 1;
    display.style.fontSize = `${fontSize}px`;
  }
}

function increaseFontSize() {
  const display = document.querySelector(".screen-num");

  let fontSize = window.getComputedStyle(display).getPropertyValue("font-size");
  fontSize = parseFloat(fontSize.substring(0, fontSize.length - 2));

  if (screenDisplay.length == 1) {
    display.style.fontSize = "60px";
  }

  while (display.scrollWidth <= display.clientWidth && fontSize < 60) {
    fontSize += 1;
    display.style.fontSize = `${fontSize}px`;
  }
}
