let h1 = document.querySelector("#page-title");
let button = document.querySelector("#mode-selector");
let footer = document.querySelector("footer");
let body = document.querySelector("body");

button.addEventListener("click", function () {
  h1.classList.toggle("dark-mode");
  footer.classList.toggle("dark-mode");
  body.classList.toggle("dark-mode");
  this.classList.toggle("dark-mode");

  if (h1.classList.contains("dark-mode")) {
    h1.innerHTML = "Dark Mode ON";
    button.innerHTML = "Light Mode";
} else {
    h1.innerHTML = "Light Mode ON";
    button.innerHTML = "Dark Mode";
  }
});
