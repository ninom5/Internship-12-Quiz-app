function appendNewScore(numberOfCorrectAnswers, difficulty, category) {
  
  const playerName = localStorage.getItem("player name");
  const quizData = {
    numberOfCorrectAnswers: numberOfCorrectAnswers,
    difficulty: difficulty,
    category: category,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  localStorage.setItem(
    playerName, JSON.stringify(quizData)
  );
}

export { appendNewScore };
