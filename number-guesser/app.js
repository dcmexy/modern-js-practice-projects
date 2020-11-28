// Game values
let min = 1,
  max = 10,
  guessesLeft = 3,
  winnningNum = getRandomNum();

// UI Elements
const gameWrapperEl = document.getElementById("game"),
  minNumEl = document.querySelector(".min-num"),
  maxNumEl = document.querySelector(".max-num"),
  guessBtnEl = document.getElementById("guess-btn"),
  guessInputEl = document.getElementById("guess-input"),
  messageEl = document.querySelector(".message");

// Assign min and max
minNumEl.textContent = min;
maxNumEl.textContent = max;

// Play again event listener
gameWrapperEl.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtnEl.addEventListener("click", function () {
  let guess = parseInt(guessInputEl.value);

  // Validate guess input value
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (guess === winnningNum) {
    // Game over - win
    gameOver(
      true,
      `That's right! You won!! ${winnningNum} is the correct number.`
    );
  } else {
    // Track guesses left
    guessesLeft -= 1;

    if (guessesLeft < 1) {
      // Game over - lose
      gameOver(
        false,
        `Game Over! You lost. The correct number is ${winnningNum}`
      );
    } else {
      // Game continues - answer wrong

      // Change input element border color
      guessInputEl.style.borderColor = "red";

      // Reset Input
      guessInputEl.value = "";

      // Set message
      setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Set message
function setMessage(message, color) {
  messageEl.style.color = color;
  messageEl.textContent = message;
}

// Game Over
function gameOver(won, message) {
  let color;

  won === true ? (color = "green") : (color = "red");

  // Disable guess input element
  guessInputEl.disabled = true;

  // Change input element border color
  guessInputEl.style.borderColor = color;

  // Set message
  setMessage(message, color);

  // Play again
  guessBtnEl.value = "Play again";
  guessBtnEl.classList.add("play-again");
}

function getRandomNum() {
  // Get a randon min number between 1 and 90
  min = Math.floor(Math.random() * 90 + 1);

  // Get random max number => min + any number between (allowed guesses + 2 = 5) and 10
  max = min + Math.floor(Math.random() * (10 - guessesLeft) + guessesLeft + 2);

  // Return a randon number between min and max
  return Math.floor(Math.random() * (max - min + 1) + min);
}
