function computerPlay() {
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

function promptPlayer() {
    //prompt player for their move
    let playerSelection = window.prompt("Please enter your choice");
    if (playerSelection == "" || playerSelection == null) {
        playerSelection = promptPlayer();
    }
    switch (playerSelection[0].toLowerCase()) {
        case 'r':
            return 'rock';
        case 'p':
            return 'paper';
        case 's':
            return 'scissors';
        default:
            return promptPlayer();
    }
}

function playRound() {
    //Executes one round. Records and prints winner and new scores.
    let playerSelection = promptPlayer();
    let computerSelection = computerPlay();
    console.log(`Computer's choice: ${computerSelection}\nHuman's Selection: ${playerSelection}`);
    if ((playerSelection == 'rock' && computerSelection == 'scissors') ||
        (playerSelection == 'paper' && computerSelection == 'rock') ||
        (playerSelection == 'scissors' && computerSelection == 'paper'))
    {
        playerScore++;
        console.log(`The human wins! ${playerSelection} beats ${computerSelection}.\nScore:\nHuman : ${playerScore}------Computer : ${computerScore}`);
    }
    else if ((playerSelection == 'scissors' && computerSelection == 'rock') ||
        (playerSelection == 'rock' && computerSelection == 'paper') ||
        (playerSelection == 'paper' && computerSelection == 'scissors')) {
        computerScore++;
        console.log(`The computer wins! ${computerSelection} beats ${playerSelection}.\nScore:\nHuman : ${playerScore}------Computer : ${computerScore}`);
    }
    else {
        console.log(`It's a draw! Both picked ${playerSelection}\nScore:\nHuman : ${playerScore}------Computer : ${computerScore}`);
    }
}

function game() {
    //start the 5-round game
    playerScore = computerScore = 0;
    playRound();
    playRound();
    playRound();
    playRound();
    playRound();
    if (playerScore > computerScore) {
        console.log(`Congratulations! Player wins ${playerScore} to ${computerScore}.`);
    }
    else if (playerScore < computerScore) {
        console.log(`Oh no! Computer wins ${computerScore} to ${playerScore}.`);
    }
    else {
        console.log(`DRAW! You are tied ${playerScore} to ${playerScore}`);
    }
}

let playerScore, computerScore;

game();