let numbers = document.querySelectorAll(".number");
let input = document.querySelector(".calculator_input");
let DEL = document.getElementById("DEL");
let operations = document.querySelectorAll(".enabled");
let inverse = document.getElementById("inverse");
let decimalPoint = document.getElementById("decimalP");
let dPoint = document.querySelector(".decimal");
let contain = document.querySelector(".calculator_container");
let addition = document.querySelector(".add");
let subtraction = document.querySelector(".subtract");
let division = document.querySelector(".divide");
let multiplication = document.querySelector(".multiply");

let enter = document.querySelector(".enter");

function add(a, b) {
  input.textContent = (a + b).toFixed(2);
}

function subtract(a, b) {
  input.textContent = (a - b).toFixed(2);
}

function multiply(a, b) {
  input.textContent = (a * b).toFixed(2);
}

function divide(a, b) {
  if (b !== 0) {
    input.textContent = (a / b).toFixed(2);
  } else {
    input.textContent = "Just Why...";
  }
}

// Delete input from last key pressed.
function back() {
  input.textContent = input.textContent.slice(0, -1);
}

// Clear All from the calculator input.
function erase() {
  input.textContent = "";
  location.reload(); // temporary fix
}
// Gather numbers and operation used in calculation, direct to proper function.
function operate(a, o, b) {
  switch (o) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "/":
      divide(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
  }
}

function op() {
  // 1) ---> INSTANTIATE variable a

  let a, symbol; //(+, -, *, /)

  // For all operation symbols (+, -, *, /)
  operations.forEach((operation) =>
    // listen for operation click (+, -, /, *)
    operation.addEventListener("click", () => {
      if (input.textContent !== "") {
        symbol = operation.dataset.opera; // Save the operation clicked in the variable, Symbol

        // 2) ---> CHANGE "let a = ..." to "a = ..."

        a = parseFloat(input.textContent); // Set the first number to be used in the calculation equal to (a)

        input.textContent = ""; // Clear calculator input

        // 3) ---> REMOVE event click handler from HERE...
      }
    })
  );

  // 4) ---> ...to HERE

  // Listen for enter click
  enter.addEventListener("click", () => {
    let b = parseFloat(input.textContent); // Save the next number used in the calculation with (b)
    operate(a, symbol, b); // Begin calculation
    //console.log(`a: ${a}` + ` symbol: ${symbol}` + ` b: ${b}`);
  });

  return symbol; // return operation(+, -, *, /) used for operate()
}

op(); // Start Calculation

// Select all numbers
numbers.forEach((number) =>
  // Check for click, allows for double digit numbers or more to be added to calculation.
  number.addEventListener("click", () => {
    if (input.textContent.toString().includes("|")) {
      input.textContent = "";
    }
    input.textContent += number.id;
  })
);

inverse.addEventListener("click", () => {
  let digit = parseInt(input.textContent) * -1;
  input.textContent = digit;
});

decimalPoint.addEventListener("click", () => {
  if (!input.textContent.includes(".")) {
    input.textContent += `${decimalPoint.dataset.opera}`;
  }
});

// Delete input from last key pressed.
DEL.addEventListener("click", () => back());
// Clear All from the calculator input.
AC.addEventListener("click", () => erase());

function blink() {
  input.style.animation = "blinker 1.5s linear infinite";
}

blink();

contain.addEventListener("click", () => {
  input.style.animation = "";
});

window.addEventListener("keydown", (e) => {
  if (e.defaultPrevented) return;

  keyPresses(e.key);
});

function keyPresses(key) {
  if (input.textContent.toString().includes("|")) input.textContent = "";

  input.style.animation = "";

  if (Number.isInteger(parseInt(key))) input.textContent += key.toString();

  switch (key) {
    case "Backspace":
    case "Delete":
      back();
      break;
    case "c":
      erase();
      break;
    case "Enter":
      enter.click();
      break;
    case "Shift":
      let digit = parseInt(input.textContent) * -1;
      input.textContent = digit;
      break;
    case ".":
      if (!input.textContent.includes(".")) {
        input.textContent += `${decimalPoint.dataset.opera}`;
      }
      break;
    case "+":
      addition.click();
      break;
    case "-":
      subtraction.click();
      break;
    case "/":
      division.click();
      break;
    case "*":
      multiplication.click();
      break;
  }
}
