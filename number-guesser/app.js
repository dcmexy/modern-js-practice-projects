// Game values
let min = 1,
  max = 10,
  winnningNum = 2,
  guessesLeft = 3;

// UI Elements
const game = document.getElementById("game"),
  minNumEl = document.querySelector(".min-num"),
  maxNumEl = document.querySelector(".max-num"),
  guessBtnEl = document.getElementById("guess-btn"),
  guessInputEl = document.getElementById("guess-input"),
  messageEl = document.querySelector(".message");

// Assign min and max
minNumEl.textContent = min;
maxNumEl.textContent = max;

// Listen for guess
guessBtnEl.addEventListener("click", function (e) {
  let guess = parseInt(guessInputEl.value);

  // Validate guess input value
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  if (guess === winnningNum) {
    // Disable guess input element
    guessInputEl.disabled = true;

    // Change input element border color
    guessInputEl.style.borderColor = "green";

    // Set message
    setMessage(`That's right! ${winnningNum} is the correct number!`, "green");
  }

  e.preventDefault();
});

// Set message
function setMessage(message, color) {
  messageEl.style.color = color;
  messageEl.textContent = message;
}
