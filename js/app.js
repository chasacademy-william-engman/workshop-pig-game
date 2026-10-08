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
const player1Current = document.getElementById("current-1");

const dice1 = document.getElementById("dice-1");
const dice2 = document.getElementById("dice-2");

const player0Panel = document.getElementsByClassName("player-0-panel");
const player1Panel = document.getElementsByClassName("player-1-panel");

const btnRoll = document.getElementsByClassName("btn-roll")[0];
const btnHold = document.getElementsByClassName("btn-hold")[0];
// ---------- 3. Funktioner ----------

const getPlayerCurrentScore = (choice) => {
  const currentPlayer = document.getElementsByClassName("active")[0];

  if (choice === "player-current-score") {
    for (const current of currentPlayer.children) {
      if (current.classList.contains("player-current-box")) {
        return current.getElementsByClassName("player-current-score")[0];
      }
    }
  } else if (choice === "player-score") {
    for (const current of currentPlayer.children) {
      if (current.classList.contains("player-score")) {
        return current;
      }
    }
  }
};

// SPEL-1: Startar ett nytt spel

function init() {}
// SPEL-2: Körs när man klickar på "Slå tärning"
btnRoll.addEventListener("click", rollDice);

function rollDice() {
  dice1.style.visibility = "visible";
  dice2.style.visibility = "visible";
  const dice1Value = Math.floor(Math.random() * 6 + 1);
  const dice2Value = Math.floor(Math.random() * 6 + 1);
  dice1.src = `../img/dice-${dice1Value}.png`;
  dice2.src = `../img/dice-${dice2Value}.png`;

  const currentPlayer = document.getElementsByClassName("active")[0];

  if (currentPlayer.classList.contains("player-0-panel")) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }

  const playerCurrentScore = getPlayerCurrentScore("player-current-score");
  const diceSum = dice1Value + dice2Value;
  if (dice1Value === 1 || dice2Value === 1) {
    playerCurrentScore.textContent = "0";
    scores[activePlayer] += diceSum;
    switchPlayer();
  } else {
    scores[activePlayer] += diceSum;
    roundScore += diceSum;
    playerCurrentScore.textContent = String(roundScore);
  }
  console.count(scores[activePlayer]);
}

// SPEL-3 och SPEL-4: Körs när man klickar på "Håll poäng"
btnHold.addEventListener("click", holdScore);

function holdScore() {
  const playerScore = getPlayerCurrentScore("player-score");
  const playerCurrentScore = getPlayerCurrentScore("player-current-score");
  playerCurrentScore.textContent = "0";
  playerScore.textContent = scores[activePlayer];
  switchPlayer();
}

// SPEL-2: Byter till den andra spelaren
function switchPlayer() {
  activePlayer = 0 ? 1 : 0;
  roundScore = 0;
  player0Panel[0].classList.toggle("active");
  player1Panel[0].classList.toggle("active");
}

// ---------- 4. Händelser ----------

init();
