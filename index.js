let dataBtns = document.querySelectorAll("[data-btn]");
let dataOp = document.querySelectorAll("[data-op]");
let dataEq = document.querySelector("[data-eq]");
let dataAce = document.querySelector("[data-ace]");
let dataDel = document.querySelector("[data-del]");
let dataTop = document.querySelector("[data-top]");
let dataBottom = document.querySelector("[data-bottom]");
const heading = document.querySelector(".heading");
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
      if (inputs === "0") return;
      inputs += e.currentTarget.textContent;
    }
    dataBottom.textContent = inputs;
  });
});
dataOp.forEach(function (ops) {
  ops.addEventListener("click", function (e) {
    if (!dataBottom.textContent && !dataTop.textContent) return;
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
/*......... Chain calculation ..........*/
// Dom
const answer = document.querySelector("#answer");
const deleteAll = document.querySelector("#del-all");
const form = document.querySelector("#form");
const clearBtn = document.querySelector("#clear");
const input = form.querySelector(".input");
const historyclose = document.querySelectorAll(".his-close");
const recordCon = document.querySelectorAll(".record-con");
const hisBtns = document.querySelectorAll("[data-his]");
const history = document.querySelector("#history");
const container = document.querySelector("#container");
// Events
form.addEventListener("submit", sumUp);
clearBtn.addEventListener("click", clear);
heading.addEventListener("dblclick", changeHeading);
//functions
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
        ? `, "${input.textContent.match(/[^0-9,]/gi)[1]}"`
        : ""
    }  are not allowed.
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
  const entry = {
    title: answer.textContent,
    values: inputs,
    time: getdate(),
    id: new Date().getTime(),
  };
  const entries = getStore();
  entries.push(entry);
  store(entries);
  render(getStore());
}
function store(entry) {
  localStorage.setItem("entry", JSON.stringify(entry));
}
function getStore() {
  if (localStorage.getItem("entry")) {
    let array = JSON.parse(localStorage.getItem("entry"));
    if (array.length > 100) {
      for (let index = 100; index <= array.length; index++) {
        array.shift();
      }
    }
    return array;
  }
  return [];
}
function getdate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cal = new Date();
  const date = cal.getDate();
  let hour = cal.getHours();
  let sub;
  if (date === 1 || date === 21 || date === 31) {
    sub = "ist";
  } else if (date === 2 || date === 22) {
    sub = "nd";
  } else if (date === 3 || date === 23) {
    sub = "rd";
  } else {
    sub = "th";
  }
  let am;
  if (hour > 12) {
    hour = hour - 12;
    am = "pm";
  } else {
    am = "am";
  }
  return `${days[cal.getDay()]} ${date + sub} ${
    months[cal.getMonth()]
  } ${hour}:${cal.getMinutes()}${am}`;
}
function clear() {
  input.textContent = "";
  answer.textContent = "0";
  answer.style.color = "";
}
function changeHeading() {
  if (heading.textContent === "Made For Concelia") return;
  heading.textContent = "Made For Concelia";
  setTimeout(() => {
    heading.textContent = "Mummy's Calculator";
  }, 3000);
}
/* ............  History ............... */
window.addEventListener("DOMContentLoaded", () => {
  render(getStore());
});
// Events
deleteAll.addEventListener("click", delAll);

hisBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    history.classList.toggle("active");
  });
});
// // // functions
function del(id) {
  let entries = getStore();
  entries = entries.filter((entry) => entry.id !== id);
  store(entries);
  render(getStore());
}
function delAll(e) {
  const button = e.currentTarget;
  if (button.textContent === "Click Again To Delete") {
    store([]);
    render(getStore());
    button.textContent = "Delete All";
    button.style.fontSize = "30px";
  } else {
    button.textContent = "Click Again To Delete";
    button.style.fontSize = "17px";
  }
  setTimeout(() => {
    if (button.textContent === "Click Again To Delete") {
      button.textContent = "Delete All";
      button.style.fontSize = "30px";
    }
  }, 3000);
}
function delNo(id) {
  const record = document.querySelector(`[data-${id}]`);
  record.classList.remove("active");
}
function getBtns() {
  const recordCon = document.querySelectorAll(".record-con");
  recordCon.forEach((record) => {
    const delTag = record.querySelector(".del-tag");
    delTag.addEventListener("click", (e) => {
      record.classList.add("active");
    });
  });
}
function render(entries) {
  let html = entries
    .reverse()
    .map((entry) => {
      const { title, values, time, id } = entry;
      return `
     <details data-${id} class="record-con">
          <summary class="rec-head">
            <p class="del-btn">
              delete?
              <span onclick="del(${id})" data-id="del-yes">Yes</span>
              <span onclick ="delNo(${id})" data-id="del-no">No</span>
            </p>
            <span id="price">${title}</span>
            <span id="date">${time}</span>
            <i class="del-tag bi bi-trash3"></i>
          </summary>
          <div class="record-items">
            ${values
              .map((value, index) => {
                return `
              <p><span class="rec-index">${
                index + 1
              }</span>&nbsp; &nbsp; ${value}</p>
              `;
              })
              .join("")}
          </div>
        </details>
    `;
    })
    .join("");
  if (!entries.length) {
    html = `<h1 class="no-record">NO RECORDS</h1>`;
  }
  container.innerHTML = html;
  getBtns();
}
