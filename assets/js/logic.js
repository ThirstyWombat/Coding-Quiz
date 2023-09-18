var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var questionTitle = document.getElementById("question-title");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startscrnEl = document.getElementById("start-screen");
var endscrenEl = document.getElementById("end-screen");
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

console.log(timerEl.value);

function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;

    timerEl.textContent = secondsLeft;

    if (secondsLeft < 1) {
      clearInterval(timerInterval);
      gotoEndSreen();
    }
  }, 1000);
}

function hideFeedback() {
  setTimeout(() => {
    feedbackEl.classList.add("hide");
    feedbackEl.innerHTML = "";
  }, 1000);
}

function correctAnswer() {
  feedbackEl.classList.remove("hide");
  var answerDiv = document.createElement("h2");
  answerDiv.textContent = "Correct!";
  feedbackEl.appendChild(answerDiv);
  currentQuestionIndex++;
  hideFeedback();
}

function incorrectAnswer() {
  feedbackEl.classList.remove("hide");
  var answerDiv = document.createElement("h2");
  answerDiv.textContent = "Wrong!";
  feedbackEl.appendChild(answerDiv);
  secondsLeft -= 15;
  currentQuestionIndex++;
  hideFeedback();
}
function showQuestion() {
  // var question = questions[currentQuestionIndex];
  startscrnEl.classList.add("hide");
  questionsEl.classList.remove("hide");
  // questionTitle.textContent = question.title;
}
function gotoEndSreen() {
  questionsEl.classList.add("hide");
  endscrenEl.classList.remove("hide");
}

function populateQuestionContent() {
  if (currentQuestionIndex === 5) {
    gotoEndSreen();
  }
  var question = questions[currentQuestionIndex];
  questionTitle.textContent = question.title;
  for (var i = 0; i < question.choices.length; i++) {
    let choice = question.choices[i];
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choicesEl.appendChild(choiceBtn);
    console.log("correct answer is " + question.answer);
    choiceBtn.addEventListener("click", function () {
      console.log("choice is " + choice);
      if (choice === question.answer) {
        console.log("the current quesition index is " + currentQuestionIndex);
        correctAnswer();
        console.log(
          "current question index after incorrect answer is " +
            currentQuestionIndex
        );
        choicesEl.innerHTML = "";
        populateQuestionContent();
      } else {
        console.log("the current quesition index is " + currentQuestionIndex);
        incorrectAnswer();
        console.log(
          "current question index after incorrect answer is " +
            currentQuestionIndex
        );
        choicesEl.innerHTML = "";
        populateQuestionContent();
      }
    });
  }
}

function startQuiz() {
  startTimer();
  showQuestion();
  populateQuestionContent();
}

startBtn.addEventListener("click", startQuiz);

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let initials = initialsEl.value;
  console.log(initials);

  localStorage.setItem("initials", initials);
});
