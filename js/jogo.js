const grid = document.querySelector(".grid");
const personagens = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];
const spanPlayer = document.querySelector(".player");
const spanTime = document.querySelector(".timer");
let primeiraCarta = "";
let segundaCarta = "";

function checkEndGame() {
  const cartasDesabilitidas = document.querySelectorAll(".disabled-card");
  if (cartasDesabilitidas.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns,${spanPlayer.innerHTML}. O tempo total foi de: ${spanTime.innerHTML}.`
    );
  }
}

function checkCards() {
  const primeiroPersonagem = primeiraCarta.getAttribute("data-personagem");
  const segundoPersonagem = segundaCarta.getAttribute("data-personagem");

  if (primeiroPersonagem === segundoPersonagem) {
    primeiraCarta.firstChild.classList.add("disabled-card");
    segundaCarta.firstChild.classList.add("disabled-card");
    primeiraCarta = "";
    segundaCarta = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("reveal-card");
      segundaCarta.classList.remove("reveal-card");
      primeiraCarta = "";
      segundaCarta = "";
    }, 500);
  }
}

function criarElemento(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function revealCard({ target }) {
  const alvo = target.parentNode;
  if (alvo.classList.contains("reveal-card")) {
    return;
  }

  if (primeiraCarta === "") {
    alvo.classList.add("reveal-card");
    primeiraCarta = alvo;
  } else if (segundaCarta === "") {
    alvo.classList.add("reveal-card");
    segundaCarta = alvo;

    checkCards();
  }
}

function criarCarta(personagem) {
  const card = criarElemento("div", "card");
  const frente = criarElemento("div", "faces frente");
  const costas = criarElemento("div", "faces costas");
  frente.style.backgroundImage = `url(../img/${personagem}.png)`;

  card.appendChild(frente);
  card.appendChild(costas);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-personagem", personagem);
  return card;
}
function carregarJogo() {
  const duplicarPersonagens = [...personagens, ...personagens];

  const embaralhado = duplicarPersonagens.sort(() => Math.random() - 0.5);

  embaralhado.forEach((personagem) => {
    const card = criarCarta(personagem);
    grid.appendChild(card);
  });
}

function time() {
  this.loop = setInterval(() => {
    const tempoAtual = +spanTime.innerHTML;
    spanTime.innerHTML = tempoAtual + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("Usuário");
  time();
  carregarJogo();
};
