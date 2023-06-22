// Questions that will be asked
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
  
  let currQuestion = 0;
  let score = 0;
  let timeLeft= 60;
  let isGameStarted = false;

  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").style.display = "none";
  });

  function startGame() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("ques").style.display = "block";
    document.getElementById("opt").style.display = "block";
    document.getElementById("btn").style.display = "block";
    loadQues();
    showTimer();
  }


  function showTimer() {
    var timerElement = document.getElementById("timer");
  
    var timerInterval = setInterval(() => {
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft % 60;
  
      var formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
      timerElement.textContent = `Time Left: ${minutes}:${formattedSeconds}`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
      }
  
      timeLeft--;
    }, 1000);
  }
  
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
  
  function loadScore() {
    var totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
  }

  function finishQuiz() {
    document.getElementById("opt").remove();
    document.getElementById("ques").remove();
    document.getElementById("btn").remove();
    document.getElementById("timer").remove();
    loadScore();
  }
  
  function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
      currQuestion++;
      loadQues();
    } else {
      document.getElementById("opt").remove();
      document.getElementById("ques").remove();
      document.getElementById("btn").remove();
      loadScore();
    }
  }
  
  function checkAns() {
    var selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
  
    if (Questions[currQuestion].a[selectedAns].isCorrect) {
      score++;
      console.log("Correct");
      nextQuestion();
    } else {
      console.log("Incorrect");
      nextQuestion();
    }
}
