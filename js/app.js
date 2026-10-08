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
const player1Score = document.getElementById("score-1");
const vinstScore = document.getElementsByClassName("final-score");

const dice1 = document.getElementById("dice-1");
const dice2 = document.getElementById("dice-2");

const player0Panel = document.getElementsByClassName("player-0-panel");
const player1Panel = document.getElementsByClassName("player-1-panel");

const btnNew = document.getElementsByClassName("btn-new")[0];
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

btnNew.addEventListener("click", function () {
  init("start");
});

function init(startValue) {
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

  if (startValue === "start") {
    dice1.style.visibility = "visible";
    dice2.style.visibility = "visible";
  } else {
    dice1.style.visibility = "hidden";
    dice2.style.visibility = "hidden";
  }

  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  isPlaying = true;
}

// SPEL-2: Körs när man klickar på "Slå tärning"
btnRoll.addEventListener("click", rollDice);

function rollDice() {
  dice1.style.visibility = "visible";
  dice2.style.visibility = "visible";
  if (!isPlaying) {
    return;
  }
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
  const playerScore = getPlayerCurrentScore("player-score");
  const diceSum = dice1Value + dice2Value;

  //Two sixes
  if (diceSum === 12) {
    scores[activePlayer] = 0;
    playerCurrentScore.textContent = "0";
    playerScore.textContent = String(scores[activePlayer]);
    switchPlayer();
    return;
  }

  if (dice1Value === 1 || dice2Value === 1) {
    playerCurrentScore.textContent = "0";
    switchPlayer();
  } else {
    roundScore += diceSum;
    console.log("Round Score:", roundScore);
    playerCurrentScore.textContent = String(roundScore);
  }
  console.count(scores[activePlayer]);
}

// SPEL-3 och SPEL-4: Körs när man klickar på "Håll poäng"
btnHold.addEventListener("click", holdScore);

function holdScore() {
  if (!isPlaying) {
    return;
  }

  const playerCurrentScore = getPlayerCurrentScore("player-current-score");
  if (playerCurrentScore.textContent === "0") {
    return;
  }

  const playerScore = getPlayerCurrentScore("player-score");

  playerCurrentScore.textContent = "0";
  playerScore.textContent = scores[activePlayer] += roundScore;

  // WINNER
  if (scores[activePlayer] >= WINNING_SCORE) {
    isPlaying = false;
    const activePlayerPanel = document.getElementsByClassName(
      `player-${activePlayer}-panel`,
    )[0];
    activePlayerPanel.classList.toggle("active");
    activePlayerPanel.classList.toggle("winner");
    playerScore.textContent = "Vinner!";
    dice1.style.visibility = "hidden";
    dice2.style.visibility = "hidden";
    return;
  }
  switchPlayer();
}

// SPEL-2: Byter till den andra spelaren
function switchPlayer() {
  roundScore = 0;
  activePlayer = 0 ? 1 : 0;
  player0Panel[0].classList.toggle("active");
  player1Panel[0].classList.toggle("active");
}

// ---------- 4. Händelser ----------

init();
