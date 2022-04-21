let order = [];
let clickedOrder = [];
let score = 0;

// 0: green
// 1: red
// 2: yellow
// 3: blue

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elColor = createEl(order[i]);
        lightColor(elColor, Number(i) + 1);
    }
};

let lightColor = (el, number) => {
    number = number * 500;
    setTimeout(() => {
        el.classList.add("selected");
        setTimeout(() => {
            el.classList.remove("selected");
        }, 250);
    }, number);
};

let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        nextLevel();
    }
};

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createEl(color).classList.add("selectd");

    setTimeout(() => {
        createEl(color).classList.remove("selected");
        checkOrder();
    }, 250);
};

let createEl = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
};

let nextLevel = () => {
    score++;
    shuffleOrder();
};

let gameOver = async () => {
    await Swal.fire("Você perdeu :(", `Pontuação: ${score}`, "error");
    score = 0;
    order = [];
    clickedOrder = [];
    playGame();
};

let playGame = async () => {
    await Swal.fire("Bem vindo ao Gênesis! Iniciando Jogo");
    nextLevel();
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
