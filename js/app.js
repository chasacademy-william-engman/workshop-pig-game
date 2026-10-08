// =============================================
// Grisspelet
// =============================================

// ---------- 1. Speldata ----------

const WINNING_SCORE = 100; // Poäng som krävs för att vinna

let scores = [0, 0]; // Totalpoäng: scores[0] = Spelare 1, scores[1] = Spelare 2
let roundScore = 0; // Omgångspoäng för den aktiva spelaren
let activePlayer = 0; // 0 = Spelare 1, 1 = Spelare 2
let isPlaying = true; // Blir false när någon har vunnit

// ---------- 2. Element i DOM:en ----------
const player0Score = document.getElementById("score-0");
const player0Current = document.getElementById("current-0");
const player1Score = document.getElementById("score-1");
const player1Current = document.getElementById("current-1");

const dice1 = document.getElementById("dice-1");
const dice2 = document.getElementById("dice-2");

const player0Panel = document.getElementsByClassName("player-0-panel");
const player1Panel = document.getElementsByClassName("player-1-panel");

const btnNew = document.getElementsByClassName("btn-new")[0];

// ---------- 3. Funktioner ----------

// SPEL-1: Startar ett nytt spel

btnNew.addEventListener("click", init);

function init() {
  const setTextContent = (element, valueString) => {
    element.textContent = valueString;
  };

  setTextContent(player0Score, "0");
  setTextContent(player0Current, "0");
  setTextContent(player1Score, "0");
  setTextContent(player1Current, "0");

  player1Panel[0].classList.remove("active");
  player0Panel[0].classList.add("active");

  player1Panel[0].classList.remove("winner");
  player0Panel[0].classList.remove("winner");

  dice1.style.visibility = "hidden";
  dice2.style.visibility = "hidden";

  scores = [0, 0];
  activePlayer = 0;
}

// SPEL-2: Körs när man klickar på "Slå tärning"
function rollDice() {}

// SPEL-3 och SPEL-4: Körs när man klickar på "Håll poäng"
function holdScore() {}

// SPEL-2: Byter till den andra spelaren
function switchPlayer() {}

// ---------- 4. Händelser ----------

init();
