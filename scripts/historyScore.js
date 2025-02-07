function appendNewScore(numberOfCorrectAnswers, difficulty, category) {
  // console.log(
  //   localStorage.getItem("player name"),
  //   numberOfCorrectAnswers,
  //   difficulty,
  //   category
  // );
  
  const playerName = localStorage.getItem("player name");
  const quizData = {
    numberOfCorrectAnswers: numberOfCorrectAnswers,
    difficulty: difficulty,
    category: category
  };

  localStorage.setItem(
    playerName, JSON.stringify(quizData)
  );
}

export { appendNewScore };
