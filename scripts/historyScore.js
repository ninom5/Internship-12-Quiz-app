const listOfScores = document.getElementById("list-of-scores");

function appendNewScore(numberOfCorrectAnswers, difficulty, category) {
  console.log(
    localStorage.getItem("player name"),
    numberOfCorrectAnswers,
    difficulty,
    category
  );
  const playerName = localStorage.getItem("player name");
  const scoreItem = document.createElement("li");
  const score = document.createElement("p");

  score.innerHTML = `Player name: ${playerName}, number of correct answers: ${numberOfCorrectAnswers} / 5, difficulty: ${difficulty}, category: ${category}`;
  scoreItem.appendChild(score);
  listOfScores.appendChild(scoreItem);

  localStorage.setItem(
    playerName,
    `${numberOfCorrectAnswers} / 5, difficulty: ${difficulty}, category: ${category}`
  );
}

export { appendNewScore };
