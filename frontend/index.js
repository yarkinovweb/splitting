const heading = document.createElement("h2");
const headings = ["Sign up", "Login"];
heading.style.margin = "5px";
heading.textContent = headings[0];
heading.style.textAlign = "center";

const labels = ["Username", "Email", "Password"];
const types = ["text", "email", "password"];

const inputStyle = {
  padding: "5px",
  border: "1px solid grey",
  borderRadius: "5px",
  marginBottom: "8px",
};

const form = document.createElement("form");
form.appendChild(heading);
form.classList.add("form");
form.addEventListener("submit", handleSubmit);

function style(el, styles) {
  Object.assign(el.style, styles);
}

function createInput(index) {
  const input = document.createElement("input");
  input.type = types[index];
  input.name = labels[index].toLowerCase();
  input.placeholder = `Enter your ${labels[index].toLowerCase()}...`;
  style(input, inputStyle);
  return input;
}

function createLabel(index) {
  const label = document.createElement("label");
  label.textContent = labels[index];
  label.style.marginBottom = "5px";
  return label;
}

form.appendChild(heading);

for (let i = 0; i < labels.length; i++) {
  form.appendChild(createLabel(i));
  form.appendChild(createInput(i));
}

const textContents = [
  "Already have an account? Login",
  "Don't have an account? Sign up",
];

const toggleButton = document.createElement("button");
toggleButton.textContent = textContents[0];
toggleButton.type = "button";
toggleButton.classList.add("toggleButton");
toggleButton.addEventListener("click", handleToggle);

function handleToggle(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");

  if (heading.textContent == headings[0]) {
    inputs.forEach((input) => {
      if (input.name === "username") {
        input.style.display = "none";
      }
    });
    labels.forEach((label) => {
      if (label.textContent === "Username") {
        label.style.display = "none";
      }
    });
    toggleButton.textContent = textContents[1];
    heading.textContent = headings[1];
  } else {
    inputs.forEach((input) => {
      if (input.name === "username") {
        input.style.display = "flex";
      }
    });
    labels.forEach((label) => {
      if (label.textContent === "Username") {
        label.style.display = "flex";
      }
    });
    toggleButton.textContent = textContents[0];
    heading.textContent = headings[0];
  }
}
let obj = {};

function handleSubmit(event) {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    obj[input.name] = input.value;
  });
  if (obj.username === "" || obj.email === "" || obj.password === "") {
    alert("Username, password and email are required!");
  }
  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => renderRow(data.user));
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
submitButton.classList.add("button");

form.appendChild(submitButton);
form.appendChild(toggleButton);
document.body.appendChild(form);

function getAllUsers() {
  fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      createTbody(data);
    });
}

getAllUsers();

const table = document.createElement("table");
table.style.border = "1px solid black";
table.style.borderCollapse = "collapse";

const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

function createThead() {
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";
  thead.appendChild(tr);

  labels.forEach((label) => {
    let th = document.createElement("th");
    th.style.border = "1px solid black";
    th.textContent = label;
    tr.appendChild(th);
  });

  table.appendChild(thead);
}

function renderRow(user) {
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";

  Object.values(user).forEach((value) => {
    let td = document.createElement("td");
    td.style.border = "1px solid black";
    td.textContent = value;
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

function createTbody(users) {
  users.forEach((user) => {
    renderRow(user);
  });
  table.appendChild(tbody);
}

document.body.appendChild(table);
createThead();
