const questionCard = document.querySelector(".questions-card");
const cardHeading = document.querySelector(".questions-card h3");
const answerButtons = document.getElementsByClassName("answer-btn");

let currentQuestion = 0;
let selectedAnswer = null;
let activeTimer = null;

function showQuizQuestions(questions) {
  questionCard.style.display = "flex";

  const responseObject = questions.results[currentQuestion];
  const questionText = responseObject.question;
  const incorrectAnswers = responseObject.incorrect_answers;
  const correctAnswer = responseObject.correct_answer;

  cardHeading.innerHTML = questionText;

  let answers = [...incorrectAnswers, correctAnswer];
  answers.sort();

  Array.from(answerButtons).forEach((btn) => (btn.innerHTML = ""));

  answers.forEach((answer, index) => {
    answerButtons[index].innerHTML = answer;

    answerButtons[index].addEventListener("click", () => {
      Array.from(answerButtons).forEach((btn) =>
        btn.classList.remove("selected-answer")
      );

      answerButtons[index].classList.add("selected-answer");

      if (activeTimer) clearTimeout(activeTimer);

      selectedAnswer = answer;
      activeTimer = setTimeout(() => {
        if (confirm("Do you want to lock in your answer?"))
          checkAnswer(answer, correctAnswer, questions, index, answers);
        else {
          alert("choose answer again");
          Array.from(answerButtons).forEach(
            (btn) => (btn.style.border = "none")
          );
        }
      }, 2000);
    });
  });
}

function checkAnswer(userAnswer, correctAnswer, questions, index, answers) {
  let correctAnswerIndex = answers.indexOf(correctAnswer);

  console.log(userAnswer);
  console.log(correctAnswer);

  if (userAnswer !== correctAnswer) {
    answerButtons[index].classList.add("wrong-answer");
  }

  answerButtons[correctAnswerIndex].classList.add("correct-answer");

  console.log();
  if (++currentQuestion < questions.results.length) {
    setTimeout(() => {
      answerButtons[index].classList.remove("wrong-answer");
      answerButtons[correctAnswerIndex].classList.remove("correct-answer");
      answerButtons[index].classList.remove("selected-answer");
      showQuizQuestions(questions);
    }, 5000);
  } else {
    alert("gotoovovovoov");
  }
}

export { showQuizQuestions };
