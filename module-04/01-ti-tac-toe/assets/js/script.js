let player,
  winner = null;
let selectedPlayer = document.getElementById("selected-player");
let selectedWinner = document.getElementById("selected-winner");
let squares = document.getElementsByClassName("square");

const changePlayer = (val) => {
  player = val;
  selectedPlayer.innerHTML = player;
};

const chooseSquare = (id) => {
  if (winner !== null) return;
  let square = document.getElementById(id);
  if (square.innerHTML !== "-") return;

  square.innerHTML = player;
  square.style.color = "#000";

  player = player === "X" ? "O" : "X";
  changePlayer(player);
  checkWinner();
};

const checkWinner = () => {
  const square1 = document.getElementById(1);
  const square2 = document.getElementById(2);
  const square3 = document.getElementById(3);
  const square4 = document.getElementById(4);
  const square5 = document.getElementById(5);
  const square6 = document.getElementById(6);
  const square7 = document.getElementById(7);
  const square8 = document.getElementById(8);
  const square9 = document.getElementById(9);

  if (checkRow(square1, square2, square3)) {
    changeSquareColor(square1, square2, square3);
    changeWinner(square1);
    return;
  }

  if (checkRow(square4, square5, square6)) {
    changeSquareColor(square4, square5, square6);
    changeWinner(square4);
    return;
  }

  if (checkRow(square7, square8, square9)) {
    changeSquareColor(square7, square8, square9);
    changeWinner(square7);
    return;
  }

  if (checkRow(square1, square4, square7)) {
    changeSquareColor(square1, square4, square7);
    changeWinner(square1);
    return;
  }

  if (checkRow(square2, square5, square8)) {
    changeSquareColor(square2, square5, square8);
    changeWinner(square2);
    return;
  }

  if (checkRow(square3, square6, square9)) {
    changeSquareColor(square3, square6, square9);
    changeWinner(square3);
    return;
  }

  if (checkRow(square1, square5, square9)) {
    changeSquareColor(square1, square5, square9);
    changeWinner(square1);
    return;
  }

  if (checkRow(square3, square5, square7)) {
    changeSquareColor(square3, square5, square7);
    changeWinner(square3);
    return;
  }
};

const changeWinner = (square) => {
  winner = square.innerHTML;
  selectedWinner.innerHTML = winner;
};

const changeSquareColor = (l1, l2, l3) => {
  l1.style.backgroundColor = "#0f0";
  l1.style.color = "#fff";
  l2.style.backgroundColor = "#0f0";
  l2.style.color = "#fff";
  l3.style.backgroundColor = "#0f0";
  l3.style.color = "#fff";
};

const checkRow = (l1, l2, l3) => {
  let equal = false;

  if (
    l1.innerHTML !== "-" &&
    l1.innerHTML === l2.innerHTML &&
    l2.innerHTML === l3.innerHTML
  ) {
    equal = true;
  }

  return equal;
};

const restart = () => {
  player = winner = null;
  selectedWinner = "";
  changePlayer("X");
  for (let i = 1; i <= 9; i++) {
    let square = document.getElementById(i);
    square.style.backgroundColor = "#CCC";
    square.style.color = "#CCC";
    square.innerHTML = "-";
  }
};

changePlayer("X");
