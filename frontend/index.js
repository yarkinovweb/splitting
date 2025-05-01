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

let isLogin = false;
function handleToggle(event) {
  event.preventDefault();
  isLogin = !isLogin;
  const inputs = document.querySelectorAll("input");
  const labels = document.querySelectorAll("label");

  if (isLogin) {
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
    submitButton.textContent = headings[1];
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
    submitButton.textContent = headings[0];
  }
}

let obj = {};
function handleSignup() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    obj[input.name] = input.value;
  });
  if (obj.username === "" || obj.email === "" || obj.password === "") {
    alert("Username, password and email are required!");
    return;
  }
  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => alert(data.message));
  inputs.forEach((input) => {
    input.value = "";
  });
}

const loginObj = {};
function handleLogin() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.name != "username") {
      loginObj[input.name] = input.value;
    }
  });
  if (loginObj.email === "" || loginObj.password === "") {
    alert("Password and email are required!");
    return;
  }

  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginObj),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href =
          "http://127.0.0.1:5500/frontend/dashboard/dashboard.html";
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
    });

  inputs.forEach((input) => {
    input.value = "";
  });
}

function handleSubmit(event) {
  event.preventDefault();
  if (isLogin) {
    handleLogin();
  } else {
    handleSignup();
  }
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = headings[0];
submitButton.classList.add("button");

form.appendChild(submitButton);
form.appendChild(toggleButton);
document.body.appendChild(form);

