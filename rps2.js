"use strict";

const gameOptions = ["rock", "paper", "scissors"];
playGame();

gameOptions.forEach((option) => {
	console.log(option);
});

function playComputer() {
	return gameOptions[getRndInteger(0, 2)];
}

function playUser() {
	let validInput = false;
	let userInputLowerCase = "";

	while (validInput == false) {
		let optionsLong = gameOptions.join(", ");
		let optionsShorthand = "";

		for (let i = 0; i < gameOptions.length; i++) {
			optionsShorthand += `<${gameOptions[i][0]}>`;
		}

		let userInput = prompt(
			`Play your turn! \nType: ${optionsLong} or just the corresponding first letters ${optionsShorthand} for short.`
		);

		if (userInput == null) {
			return;
		}

		userInputLowerCase = userInput.toLowerCase();

		for (let i = 0; i < gameOptions.length; i++) {
			if (userInputLowerCase === gameOptions[i][0]) {
				userInputLowerCase = gameOptions[i];
			}
			if (userInputLowerCase === gameOptions[i]) {
				validInput = true;
			}
		}
	}
	return userInputLowerCase;
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection == computerSelection) {
		return "tie";
	} else if (
		//game logic- needs rewriting if options are added/removed
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

function playGame() {
	let computerWins = 0;
	let playerWins = 0;
	let roundWinner = 0;
	let gameRoundNr = 0;

	for (let i = 0; i < 5; i++) {
		let playerSelection = playUser();
		let computerSelection = playComputer();
		gameRoundNr = i + 1;

		if (playerSelection == undefined) {
			alert("Game canceled.");
			return;
		}

		roundWinner = playRound(playerSelection, computerSelection);

		if (roundWinner == "tie") {
			msgRoundEnd(
				roundWinner,
				gameRoundNr,
				playerSelection,
				computerSelection
			);
		} else if (roundWinner == "player") {
			msgRoundEnd(
				roundWinner,
				gameRoundNr,
				playerSelection,
				computerSelection
			);
			playerWins++;
			if (playerWins === 3) {
				return msgGameEnd(playerWins, computerWins, round);
			}
		} else {
			msgRoundEnd(
				roundWinner,
				gameRoundNr,
				playerSelection,
				computerSelection
			);
			computerWins++;
			if (computerWins === 3) {
				return msgGameEnd(playerWins, computerWins, round);
			}
		}
	}
	return msgGameEnd(playerWins, computerWins, gameRoundNr);
}

function msgRoundEnd(
	roundWinner,
	gameRoundNr,
	playerSelection,
	computerSelection
) {
	let roundResultMessage = "";
	if (roundWinner == "player") {
		roundResultMessage = "You won this round!";
	} else if (roundWinner == "computer") {
		roundResultMessage = "The computer wins this round!";
	} else {
		roundResultMessage = "It is a tie!";
	}

	let outputMessage = `Round ${gameRoundNr}: You played ${playerSelection}, computer played ${computerSelection}. ${roundResultMessage}`;

	return alert(outputMessage);
}

function msgGameEnd(playerWins, computerWins, gameRoundNr) {
	let gameResultMessage = "";
	if (playerWins > computerWins) {
		gameResultMessage = "You won the game!";
	} else if (playerWins < computerWins) {
		gameResultMessage =
			"The computer wins this game. Better luck next time.";
	} else {
		gameResultMessage = "It is a tie!";
	}

	let outputMessage;
	if (playerWins == 1 && computerWins == 1) {
		outputMessage = `After ${gameRoundNr} rounds, you have won ${playerWins} round, the computer has won ${computerWins} round. ${gameResultMessage}`;
	} else if (playerWins == 1) {
		outputMessage = `After ${gameRoundNr} rounds, you have won ${playerWins} round, the computer has won ${computerWins} rounds. ${gameResultMessage}`;
	} else if (computerWins == 1) {
		outputMessage = `After ${gameRoundNr} rounds, you have won ${playerWins} rounds, the computer has won ${computerWins} round. ${gameResultMessage}`;
	} else {
		outputMessage = `After ${gameRoundNr} rounds, you have won ${playerWins} rounds, the computer has won ${computerWins} rounds. ${gameResultMessage}`;
	}

	return alert(outputMessage);
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
