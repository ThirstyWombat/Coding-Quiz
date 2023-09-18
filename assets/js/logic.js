var currentQuestionIndex = 0;
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
var finalScore = document.getElementById("final-score");
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var record = { initials: "", score: 0 };

let secondsLeft = 75;

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
  record.score++;
  sfxRight.play();
  hideFeedback();
}

function incorrectAnswer() {
  feedbackEl.classList.remove("hide");
  var answerDiv = document.createElement("h2");
  answerDiv.textContent = "Wrong!";
  feedbackEl.appendChild(answerDiv);
  secondsLeft -= 15;
  currentQuestionIndex++;
  sfxWrong.play();
  hideFeedback();
}
function showQuestion() {
  startscrnEl.classList.add("hide");
  questionsEl.classList.remove("hide");
}
function gotoEndSreen() {
  questionsEl.classList.add("hide");
  endscrenEl.classList.remove("hide");
  finalScore.textContent = "Your final score is " + record.score;
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

    choiceBtn.addEventListener("click", function () {
      if (choice === question.answer) {
        correctAnswer();

        choicesEl.innerHTML = "";
        populateQuestionContent();
      } else {
        incorrectAnswer();

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
  let allRecords = JSON.parse(localStorage.getItem("allRecords"));

  if (allRecords !== null) {
    record.initials = initialsEl.value;
    allRecords.push(record);
    localStorage.setItem("allRecords", JSON.stringify(allRecords));
  } else {
    allRecords = [];
    record.initials = initialsEl.value;
    allRecords.push(record);
    localStorage.setItem("allRecords", JSON.stringify(allRecords));
  }
});
