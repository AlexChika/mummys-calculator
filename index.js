let dataBtns = document.querySelectorAll("[data-btn]");
let dataOp = document.querySelectorAll("[data-op]");
let dataEq = document.querySelector("[data-eq]");
let dataAce = document.querySelector("[data-ace]");
let dataDel = document.querySelector("[data-del]");
let dataTop = document.querySelector("[data-top]");
let dataBottom = document.querySelector("[data-bottom]");
let inputs = "";
let currentOp;
let opStr = "";
dataAce.addEventListener("click", function () {
  inputs = "";
  dataBottom.textContent = "";
  dataTop.textContent = "";
});
dataDel.addEventListener("click", function () {
  if (inputs) {
    inputs = inputs.slice(0, -1);
    dataBottom.textContent = inputs;
  } else {
    dataBottom.textContent = dataBottom.textContent.slice(0, -1);
  }
  if (!dataBottom.textContent) {
    if (
      dataTop.textContent.includes(currentOp) ||
      dataTop.textContent.includes(opStr[opStr.length - 1])
    ) {
      dataTop.textContent = dataTop.textContent.split(currentOp).join("");
      dataTop.textContent = dataTop.textContent
        .split(opStr[opStr.length - 1])
        .join("");
    }
    dataBottom.textContent = dataTop.textContent;
    dataTop.textContent = "";
  }
});

dataBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    inputs = dataBottom.textContent;

    if (e.currentTarget.textContent === ".") {
      if (inputs.includes(".")) return;
      inputs += e.currentTarget.textContent;
    } else {
      inputs += e.currentTarget.textContent;
    }
    dataBottom.textContent = inputs;
  });
});
dataOp.forEach(function (ops) {
  ops.addEventListener("click", function (e) {
    currentOp = e.currentTarget.textContent;
    opStr += e.currentTarget.textContent;
    if (dataTop.textContent) {
      currentOp = opStr[opStr.length - 2];
      dataTop.textContent = calc() + " " + opStr[opStr.length - 1];
    } else {
      dataTop.textContent = dataBottom.textContent + " " + currentOp;
    }
    dataBottom.textContent = "";
    inputs = "";
  });
});
dataEq.addEventListener("click", function () {
  currentOp = opStr[opStr.length - 1];
  dataBottom.textContent = calc();
  dataTop.textContent = "";
  inputs = "";
});

//  The Calculate function
function calc() {
  let firstInput = parseFloat(dataTop.textContent);
  let lastInput = parseFloat(dataBottom.textContent);
  if (!firstInput && !lastInput) return;
  let op = currentOp;
  let result;
  if (op === "*") {
    result = firstInput * lastInput;
  } else if (op === "+") {
    result = firstInput + lastInput;
  } else if (op === "-") {
    result = firstInput - lastInput;
  } else if (op === "÷") {
    result = firstInput / lastInput;
  }
  if (isNaN(firstInput)) {
    result = lastInput;
  } else if (isNaN(lastInput)) {
    result = firstInput;
  }
  return result;
}
// Chain calculation
let answer = document.querySelector("#answer");
const form = document.querySelector("#form");
const clearBtn = document.querySelector("#clear");
const input = form.querySelector(".input");
form.addEventListener("submit", sumUp);
clearBtn.addEventListener("click", clear);

function sumUp(e) {
  e.preventDefault();
  if (!input.textContent) {
    answer.textContent = "Pls fill in values";
    answer.style.color = "red";
    return;
  }
  if (/[^0-9,]/gi.test(input.textContent)) {
    answer.textContent = `"${input.textContent.match(/[^0-9,]/gi)[0]}" ${
      input.textContent.match(/[^0-9,]/gi)[1]
        ? `, " ${input.textContent.match(/[^0-9,]/gi)[1]}"`
        : ""
    } are not allowed.
    Pls use comma "," to separate values.`;
    answer.style.color = "yellow";
    return;
  }
  let sum = 0;
  const inputs = input.textContent.split(",");
  inputs.forEach((x) => {
    if (x !== "") {
      sum += parseInt(x);
    }
  });
  answer.textContent = sum.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  answer.style.color = "green";
}
function clear() {
  input.textContent = "";
  answer.textContent = "0";
  answer.style.color = "";
}
