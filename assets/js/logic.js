var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

// EL: when the user clicks an answer button If: the answer was correct, append a "Correct!" text element down below, else: append a "Wrong!" element down below.
// eventlistener: when a child of the main div is clicked, move to the next question (by appending new elements?).
// eventlistener: when an element of the class button is hovered ("mouseover"), change it's color
// eventlistener: when the element of the id startbutton is clicked, appened a timer of 75 seconds to the top right
// timer is a function that contains the previous declared var of secondsLeft = 75 and decreases it (secondsLeft--;) at a setInterval of 1000ms.
//If: the secondsLeft === 0, clearInterval and execute a function that goes to the final score screen
// eventlistener: when the wrong answer is clicked, decrement secondsLeft by 15 seconds (using loop maybe?)
// at the final screen, capture the user's input for their initials (as well as the score they got), and set it to localStorage
// at the highscores screen, populate a UL by appending the initials (from localStorage.getItem(whatever))
// high scores screen is accessible through a link in the top right of the page.
//variable currentQuestions, when next question button is clicked, change the contents of currentQuestions
// possible options for questions [{ question: 1, text: 'Do you like piñacolada?'}, {...}] var steps = 1
//
// let initialsInput = document.querySelector("#initials");

let secondsLeft = 75;

// let startbuttonElement = document.querySelector("#startButton");

console.log(timerEl.value);

// let timeElement = document.querySelector("#time");

function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;

    timerEl.textContent = secondsLeft;

    if (secondsLeft < 1) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
startBtn.addEventListener("click", startTimer);

// submitButton.addEventListener("click", function (event) {
//   event.preventDefault();

//   let initials = initialsInput.value;
//   console.log(initials);

//

//   localStorage.setItem("initials", initials);
// });
