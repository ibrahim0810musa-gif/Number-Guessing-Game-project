const guessForm = document.querySelector("#guess-form");

const guessInput = document.querySelector("#guess-input");

const message = document.querySelector("#message");

const attemptsDisplay = document.querySelector("#attempts");

const bestScoreDisplay = document.querySelector("#best-score");
const newGameButton = document.querySelector("#new-game-button");


let secretNumber = Math.floor(Math.random()*100) + 1;
let attempts = 0;
let gameOver = false;


let bestScore = localStorage.getItem("bestScore");

bestScoreDisplay.textContent = bestScore ===null ? "Best score:-" : "Best score " + bestScore;


guessForm.addEventListener("submit",function (event) {
     event.preventDefault();
     
     
     if(gameOver) {
     message.textContent = "Start a new game to play again !";
     return;
}


    const guess = Number(guessInput.value);
    
    if (guessInput.value === "" || !Number.isInteger(guess) || guess < 1 || guess > 100) {
    
     message.textContent = "Please enter a whole number from 1 to 100.";
      return;
       }
    
    attempts++
    
    attemptsDisplay.textContent = "Attempts." + attempts;
    
    if (guess === secretNumber) {
    message.textContent = "Correct! 🎉 You won in " + attempts + " attempts!";
    gameOver = true;
    
    if (bestScore === null || attempts < Number(bestScore)) {
    bestScore = attempts;
    localStorage.setItem("bestScore", bestScore);
    bestScoreDisplay.textContent = "Best score: " + bestScore;
  }
  
  } else if (guess > secretNumber) {
    message.textContent = "Too high! Try a lower number. 👇";
  } else {
    message.textContent = "Too low! Try a higher number. 👆";
  }

  guessInput.value = "";
});

newGameButton.addEventListener("click", function () {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;

  attemptsDisplay.textContent = "Attempts: 0";
  message.textContent = "New game started! Make your first guess. 🎯";
  guessInput.value = "";
});