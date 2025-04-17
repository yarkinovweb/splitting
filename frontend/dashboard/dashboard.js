const back = document.getElementById("back");
const forward = document.getElementById("forward");

back.addEventListener("click", () => {
  window.history.go(-1);
});
forward.addEventListener("click", () => {
  window.history.forward();
});

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "http://127.0.0.1:5500/frontend";
}
