function generateComputersMove() {
    //generate random move for computer
    let numericalChoice = Math.floor(Math.random() * 3);
    let translatedChoice;
    switch (numericalChoice) {
        case 0:
            translatedChoice = 'rock';
            break;
        case 1:
            translatedChoice = 'paper';
            break;
        case 2:
            translatedChoice = 'scissors';
            break;
    }
    return translatedChoice;
}

function checkForGamesWinner() {
    if (playerScore === 5) {
        return 'player';
    }
    if (computerScore === 5) {
        return 'computer';
    }
    else {
        return null;
    }
}

function determineRoundsWinner(playerSelection, computerSelection) {
    if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
        (playerSelection == 'paper' && computerSelection == 'rock') ||
        (playerSelection == 'scissors' && computerSelection == 'paper'))
    {
        return "player";
    }
    else if ((playerSelection == 'scissors' && computerSelection == 'rock') ||
        (playerSelection == 'rock' && computerSelection == 'paper') ||
        (playerSelection == 'paper' && computerSelection == 'scissors')) {
        return "computer";
    }
    else {
        return "draw";
    }
}

function playRound(playerClickEvent) {
    if (!gameInProgress) {
        return;
    }

    let playerSelection = playerClickEvent.target.getAttribute("data-value");   // determines which button has been pushed based on its custom-defined "data-value" attribute
    if (playerClickEvent.target.tagName !== 'BUTTON')   // The user may have clicked on the image element inside the button which disrupts the above statement
    {
        playerSelection = playerClickEvent.target.parentElement.getAttribute("data-value"); //make sure we get the "data-value" attr of the button, not its descendants
    }

    let computerSelection = generateComputersMove();
    let result = determineRoundsWinner(playerSelection, computerSelection); //returns this round's winner

    switch (result) {
        case 'player':
            gameStatusDisplay.textContent = `You have won this round!`;
            main.className = 'green-background';
            playerScore++;
            break;
        
        case 'computer':
            gameStatusDisplay.textContent = `The computer has won this round!`;
            main.className = 'red-background';
            computerScore++;
            break;
        
        case 'draw':
            gameStatusDisplay.textContent = `DRAW!`;
            main.className = 'beige-background';
            break;
    }
    computerSelectionDisplay.src = `images/${computerSelection}.png`;
    computerSelectionDisplay.alt = computerSelection;
    playerSelectionDisplay.src = `images/${playerSelection}.png`;
    playerSelectionDisplay.alt = playerSelection;
    playerScoreBoard.textContent = playerScore;
    computerScoreBoard.textContent = computerScore;

    let winner = checkForGamesWinner();
    if (winner !== null) {
        if (winner === 'player') {
            gameResultDisplay.textContent = 'Hooray! You win!';
            startOrStopGame();
        }
        else if (winner === 'computer') {
            gameResultDisplay.textContent = 'Oh no! You lose!';
            startOrStopGame();
        }
    }
    
}

function startOrStopGame() {
    if (gameInProgress) {
        gameInProgress = false;
        gameStatusDisplay.textContent = 'Press play to start';

        playButton.classList.remove("display-none");
        playerOptionButtons.forEach((button) => {
            button.classList.add("display-none");
        });
        gameResultDisplay.classList.remove("display-none");
    }
    else {
        playerScore = computerScore = 0;
        gameInProgress = true;
        gameStatusDisplay.textContent = 'Game in Progress';
        
        playButton.classList.add("display-none");
        playerOptionButtons.forEach((button) => {
            button.classList.remove("display-none");
        });
        gameResultDisplay.classList.add("display-none");

        resetDisplays();
    }
}


function resetDisplays() {
    main.className = 'beige-background';
    computerSelectionDisplay.src = 'images/questionmark.png';
    computerSelectionDisplay.alt = 'Question Mark';
    playerSelectionDisplay.src = 'images/questionmark.png';
    playerSelectionDisplay.alt = 'Question Mark';
    playerScoreBoard.textContent = '0';
    computerScoreBoard.textContent = '0';
}


/*   Start Reading Here   */
const main = document.querySelector("main");
const computerSelectionDisplay = document.querySelector("#computer-selection-display img");
const playerSelectionDisplay = document.querySelector("#player-selection-display img");
const playerScoreBoard = document.querySelector("#player-score-board");
const computerScoreBoard = document.querySelector("#computer-score-board");
const gameResultDisplay = document.querySelector("#game-result-display");
const gameStatusDisplay = document.querySelector("#game-status-display");

const playButton = document.querySelector("#play-button");
playButton.addEventListener("click", () => {
    if (gameInProgress === false) { startOrStopGame();}
});

const playerOptionButtons = document.querySelectorAll('button.player-option');  //rock, paper and scissors buttons
playerOptionButtons.forEach((button) => {
    button.addEventListener("click", playRound);
});

let gameInProgress = false;
let playerScore = 0, computerScore = 0;


resetDisplays();