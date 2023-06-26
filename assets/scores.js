// Retrieve high scores from local storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Sorts the scores in descending order based on the score value
highScores.sort(function (a, b) {
    return b.score - a.score;
});

// Gets a reference to the table body element
var tableBody = document.getElementById("score-table-body");

// Goes through the high scores and create table rows to display them
for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var row = document.createElement("tr");

    // Creates table cells for initials and score
    var initialsCell = document.createElement("td");
    initialsCell.textContent = score.initials;
    var scoreCell = document.createElement("td");
    scoreCell.textContent = score.score;

    row.appendChild(initialsCell);
    row.appendChild(scoreCell);

    tableBody.appendChild(row);
}