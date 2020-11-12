"use strict";

let btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
	btn.addEventListener("click", playGame);
});

const gameOptions = ["rock", "paper", "scissors"];

let gameRoundNr = 0;
let playerWins = 0;
let computerWins = 0;
let ties = 0;
let gameEnd = false;

const gameStatus = document.querySelectorAll(".gameStatus");
const rounds = document.getElementById("roundNr");
const wins = document.getElementById("userWin");
const tie = document.getElementById("tie");
const lose = document.getElementById("computerWin");

function playGame() {
	if (gameEnd) {
		resetCounters();
		gameEnd = false;
	}

	const computerSelection = playComputer();
	animateComputerPlay(computerSelection);

	const playerSelection = this.value;
	animateUserPlay(playerSelection);

	gameRoundNr++;
	setCounter(rounds, gameRoundNr);

	const roundWinner = playRound(
		playerSelection,
		computerSelection,
		gameRoundNr
	);

	if (roundWinner == "tie") {
		msgRoundEnd(
			roundWinner,
			gameRoundNr,
			playerSelection,
			computerSelection
		);
		ties++;
		setCounter(tie, ties);
	} else if (roundWinner == "player") {
		msgRoundEnd(
			roundWinner,
			gameRoundNr,
			playerSelection,
			computerSelection
		);
		playerWins++;
		setCounter(wins, playerWins);
		if (
			playerWins === 3 ||
			(playerWins == 2 && computerWins == 0 && gameRoundNr > 3)
		) {
			msgGameEnd(playerWins, computerWins, gameRoundNr);
			gameEnd = true;
		}
	} else {
		msgRoundEnd(
			roundWinner,
			gameRoundNr,
			playerSelection,
			computerSelection
		);
		computerWins++;
		setCounter(lose, computerWins);
		if (
			computerWins === 3 ||
			(computerWins == 2 && playerWins == 0 && gameRoundNr > 3)
		) {
			msgGameEnd(playerWins, computerWins, gameRoundNr);
			gameEnd = true;
		}
	}

	if (gameRoundNr >= 5) {
		msgGameEnd(playerWins, computerWins, gameRoundNr);
		gameEnd = true;
	}
}

function animateComputerPlay(computerSelection) {
	const computerImg = document.getElementById("computerImg");
	computerImg.src = `img/rock_icon.png`;
	computerImg.classList.add("comp-animation");
	setTimeout(function () {
		computerImg.classList.remove("comp-animation");
		computerImg.src = `img/${computerSelection}_icon.png`;
	}, 200);
}

function animateUserPlay(playerSelection) {
	const playerImg = document.getElementById("userImg");
	playerImg.src = `img/rock_icon.png`;
	playerImg.classList.add("user-animation");
	setTimeout(function () {
		playerImg.classList.remove("user-animation");
		playerImg.src = `img/${playerSelection}_icon.png`;
	}, 200);
}

function setCounter(element, count) {
	element.classList.add("add-color");
	element.innerText = count;
	setTimeout(function () {
		element.classList.remove("add-color");
	}, 200);
}

function resetCounters() {
	gameRoundNr = 0;
	rounds.innerText = gameRoundNr;
	playerWins = 0;
	wins.innerText = playerWins;
	computerWins = 0;
	lose.innerText = computerWins;
	ties = 0;
	tie.innerText = ties;
}

function playRound(playerSelection, computerSelection, gameRoundNr) {
	gameRoundNr++;
	if (playerSelection === computerSelection) {
		return "tie";
	} else if (
		(playerSelection == gameOptions[0] &&
			computerSelection == gameOptions[1]) ||
		(playerSelection == gameOptions[1] &&
			computerSelection == gameOptions[2]) ||
		(playerSelection == gameOptions[2] &&
			computerSelection == gameOptions[0])
	) {
		return "computer";
	} else {
		return "player";
	}
}

function msgRoundEnd(
	roundWinner,
	gameRoundNr,
	playerSelection,
	computerSelection
) {
	let roundResultMessage = "";
	if (roundWinner == "player") {
		roundResultMessage = `You <span class="text-orange h4">won</span> this round!`;
	} else if (roundWinner == "computer") {
		roundResultMessage = `You <span class="text-orange h4">lose</span> this round!`;
	} else {
		roundResultMessage = `It is a <span class="text-orange h4">tie</span>!`;
	}

	let outputMessage = `
        <p>
            <span class="text-orange h4">Round ${gameRoundNr}:</span>
            <br>
            You played <span class="text-orange h5">${playerSelection}</span>, computer played <span class="text-orange h5">${computerSelection}</span>.
            <br>
            ${roundResultMessage}
        </p>
    `;

	return gameStatus.forEach((e) => (e.innerHTML = outputMessage));
}

function msgGameEnd(playerWins, computerWins, gameRoundNr) {
	let gameResultMessage = "";
	if (playerWins > computerWins) {
		gameResultMessage = `You win!`;
	} else if (playerWins < computerWins) {
		gameResultMessage = `Oh, no!`;
	} else {
		gameResultMessage = `It's a tie!`;
	}

	let outputMessage;
	if (playerWins == computerWins) {
		outputMessage = `
            <p>
                <span class="text-orange h4">${gameRoundNr} rounds played!</span>
            </p>
            <p>
                The game count is 
                <br>
                <span class="text-orange h5">${playerWins} : ${computerWins}</span>
                <br>
                It's a tie!
            </p>
        `;
	} else if (playerWins > computerWins) {
		outputMessage = `
            <p> 
                <span class="text-orange h4">${gameRoundNr} rounds played!</span>
            </p>
            <p>
                The game count is 
                <br>
                <span class="text-orange h5">${playerWins} : ${computerWins}</span> for you!
                <br>
                You won this game!
            </p>
        `;
	} else {
		outputMessage = `
            <p>
                <span class="text-orange h4">${gameRoundNr} rounds played!</span>
            </p>
            <p>
                The game count is 
                <br>
                <span class="text-orange h5">${playerWins} : ${computerWins}</span> for the computer!
                <br>
                You lose this game. Better luck next time!
            </p>
        `;
	}

	Swal.fire({
		title: gameResultMessage,
		html: outputMessage,
		confirmButtonColor: "#ffbea7",
		backdrop: "hsla(17, 24%, 32%, 0.4)",
	});

	return gameStatus.forEach((e) => (e.innerHTML = outputMessage));
}

function playComputer() {
	return gameOptions[getRndInteger(0, 2)];

	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
