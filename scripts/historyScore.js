function appendNewScore(numberOfCorrectAnswers, difficulty, category) {
  const playerName = localStorage.getItem("player name");
  const quizData = {
    numberOfCorrectAnswers: numberOfCorrectAnswers,
    difficulty: difficulty,
    category: category,
    dateTime: new Date(),
  };

  localStorage.setItem(playerName, JSON.stringify(quizData));
}

export { appendNewScore };
