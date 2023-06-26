// Questions
var Questions = [
    {
        q: "Commonly used data types DO not include:",
        a: [
            { text: "Alerts", isCorrect: true },
            { text: "strings", isCorrect: false },
            { text: "booleans", isCorrect: false },
            { text: "arrays", isCorrect: false }
        ]
    },
    {
        q: "The condition of an if / else statement is enclosed with _____",
        a: [
            { text: "parenthesis", isCorrect: true },
            { text: "quotes", isCorrect: false },
            { text: "curly brackets", isCorrect: false },
            { text: "square brackets", isCorrect: false }
        ]
    },
    {
        q: "Arrays in JavaScript can be used to store ______",
        a: [
            { text: "booleans", isCorrect: false },
            { text: "numbers and strings", isCorrect: false },
            { text: "other arrays", isCorrect: false },
            { text: "All of the above", isCorrect: true }
        ]
    },
    {
        q: "String values must be enclosed within ______ when being assigned to variables",
        a: [
            { text: "quotes", isCorrect: true },
            { text: "commas", isCorrect: false },
            { text: "curly brackets", isCorrect: false },
            { text: "parenthesis", isCorrect: false }
        ]
    },
    {
        q: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        a: [
            { text: "console.log", isCorrect: true },
            { text: "JavaScript", isCorrect: false },
            { text: "terminal/bash", isCorrect: false },
            { text: "for loops", isCorrect: false }
        ]
    }
];

var currQuestion = 0;
var score = 0;
var isGameStarted = false;
var timerCount = 60;
var timerElement = document.querySelector("#timer-count");
var isWin = false;
var nameEl = document.getElementById("initials-form");
var scorePageEl = document.getElementById("score-page");
var scoreAreaEl = document.getElementById("score-area");
var saveButtonEl = document.createElement("button");
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn").style.display = "none";
});

function startGame() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("ques").style.display = "block";
    document.getElementById("opt").style.display = "block";
    document.getElementById("btn").style.display = "block";
    loadQues();
    startTimer();
}

function startTimer() {
    var timer = setInterval(function () {
        timerCount--;
        timerElement.innerHTML = timerCount;
        if (currQuestion >= Questions.length) {
            clearInterval(timer)
        }
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

// Function to load current question and options
function loadQues() {
    var question = document.getElementById("ques");
    var opt = document.getElementById("opt");

    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = "";

    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        var choicesdiv = document.createElement("div");
        var choice = document.createElement("input");
        var choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;

        choiceLabel.textContent = Questions[currQuestion].a[i].text;

        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }
}

loadQues();

// Function to go to the next question
function nextQuestion() {
    currQuestion++;
    if (currQuestion < Questions.length) {
        loadQues();
    } else {
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        loadScore();
    }
}

// Function to check the selected answer
function checkAns() {
    var selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);

    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct");
        nextQuestion();
    } else {
        console.log("Incorrect");
        timerCount -= 10;
        nextQuestion();
    }
}

function loadScore() {
    document.getElementById("score-page").style.display = "block";
    var totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`;

}

// Function to finish quiz and show score
function finishQuiz() {
    document.getElementById("opt").remove();
    document.getElementById("ques").remove();
    document.getElementById("btn").remove();
    document.getElementById("timer").remove();
    loadScore();
}


// Function to display score and initials
function displayScore() {

    scoreAreaEl.textContent = "Final Score: " + score;

    // Create an input element for initials
    var initTextEl = document.createElement("input");
    initTextEl.setAttribute("id", "initials-input");
    initTextEl.setAttribute("type", "text");
    initTextEl.setAttribute("name", "initials");
    initTextEl.setAttribute("placeholder", "Enter Initials here");

    nameEl = document.createElement("form");
    nameEl.appendChild(initTextEl);

    nameEl.addEventListener("submit", function (e) {
        e.preventDefault();
        var initials = document.querySelector("#initials-input").value;
        saveHighScore(initials);
        viewHighScores();
    });
}

// Create a save button element
saveButtonEl.setAttribute("id", "save-btn");
saveButtonEl.setAttribute("type", "submit");
saveButtonEl.textContent = "Save Score";
scorePageEl.appendChild(nameEl);

nameEl.addEventListener("submit", function (e) {
    e.preventDefault();
    var initials = document.querySelector("#initials-input").value;
    saveHighScore(initials);
    viewHighScores();
});

displayScore();


// Function to save high score to local storage
function saveHighScore(initials) {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var newHighScore = {
        initials: initials,
        score: score
    };

    highScores.push(newHighScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to redirect to high scores page
function viewHighScores() {
    // Redirect to the high scores page
    window.location.href = "scores.html";
}

