const loginInput = document.querySelector(".login_input");
const loginButton = document.querySelector(".login_button");
const form = document.querySelector(".login_form");

function habilitarLogin(event) {
  const valueInput = event.target.value;
  if (valueInput.length > 2) {
    loginButton.removeAttribute("disabled");
  } else {
    loginButton.setAttribute("disabled", "");
  }
}
loginInput.addEventListener("input", habilitarLogin);

function nomelogin(event) {
  event.preventDefault();
  localStorage.setItem("Usuário", loginInput.value);
  window.location = "pages/game.html";
}

form.addEventListener("submit", nomelogin);
