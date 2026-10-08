    // =============================================
    // Grisspelet
    // =============================================

const { act } = require("react");


    // ---------- 1. Speldata ----------

    const WINNING_SCORE = 100; // Poäng som krävs för att vinna

    let scores = [0, 0];       // Totalpoäng: scores[0] = Spelare 1, scores[1] = Spelare 2
    let roundScore = 0;        // Omgångspoäng för den aktiva spelaren
    let activePlayer = 0;      // 0 = Spelare 1, 1 = Spelare 2
    let isPlaying = true;      // Blir false när någon har vunnit


    // ---------- 2. Element i DOM:en ----------
    const player0Score =document.getElementById("score-0")
    const player0Current = document.getElementById("current-0")
    const player1Current = document.getElementById("current-1")

    const dice1 = document.getElementById("dice-1")
    const dice2 = document.getElementById("dice-2")

    const player0Panel = document.getElementsByClassName("player-0-panel");
    const player1Panel = document.getElementsByClassName("player-1-panel");

    const btnRoll = document.getElementsByClassName("btn-roll")[0];
    // ---------- 3. Funktioner ----------

    // SPEL-1: Startar ett nytt spel

    function init() {

    }
    // SPEL-2: Körs när man klickar på "Slå tärning"
    btnRoll.addEventListener("click", rollDice)
        
    function rollDice() {
         dice1.style.visibility = "visible"
         dice2.style.visibility = "visible"
        const dice1Value = Math.floor(Math.random() * 6 + 1);
        const dice2Value = Math.floor(Math.random() * 6 + 1);
        dice1.src = `../img/dice-${dice1Value}.png`
        dice2.src = `../img/dice-${dice2Value}.png`

        const currentPlayer = document.getElementsByClassName("active")[0];

        if (currentPlayer.classList.contains("player-0-panel")) {
            activePlayer = 0
        } else {
            activePlayer = 1
        }

        for (const current of currentPlayer.children) {
            if (current.classList.contains("player-current-box")) {
                const playerCurrentScore = current.getElementsByClassName("player-current-score")[0];
                if(dice1Value === 1 || dice2Value === 1){
                    scores[activePlayer] = 0
                    playerCurrentScore.textContent = "0"
                    switchPlayer()
                    break;
                }
                scores[activePlayer] += dice1Value + dice2Value
                playerCurrentScore.textContent = String(scores[activePlayer]);
                break;
            }
        }

    }       
    
    // SPEL-3 och SPEL-4: Körs när man klickar på "Håll poäng"
    function holdScore() {

    }

    // SPEL-2: Byter till den andra spelaren
    function switchPlayer() {
        activePlayer = 0 ? 1 : 0;

        player0Panel[0].classList.toggle("active");
        player1Panel[0].classList.toggle("active");
    }


    // ---------- 4. Händelser ----------

    init();
