import { a } from "./quizStats.js";

const questionCard = document.querySelector(".questions-card");
const cardHeading = document.querySelector(".questions-card h3");
const answerButtons = document.getElementsByClassName("answer-btn");
const nextQuestion = document.getElementById("next-question-btn");

let currentQuestion = 0;
let correctAnswersCounter = 0;

let numberOfAnswers = 0;

let selectedAnswer = null;
let activeTimer = null;

function showQuizQuestions(questions) {
  questionCard.style.display = "flex";
  nextQuestion.disabled = true;

  const responseObject = questions.results[currentQuestion];
  const questionText = responseObject.question;
  const incorrectAnswers = responseObject.incorrect_answers;
  const correctAnswer = responseObject.correct_answer;

  cardHeading.innerHTML = questionText;

  numberOfAnswers = responseObject.type === "boolean" ? 2 : 4;

  questionCard.querySelectorAll(".answer-btn").forEach((btn) => btn.remove());

  for (let i = 0; i < numberOfAnswers; i++) {
    let button = document.createElement("button");
    button.classList.add("answer-btn");
    questionCard.appendChild(button);
  }

  let answers = [...incorrectAnswers, correctAnswer];
  answers.sort();

  Array.from(answerButtons).forEach((btn) => (btn.innerHTML = ""));

  answers.forEach((answer, index) => {
    answerButtons[index].disabled = false;
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
          resetSelectedAnswer(index);
        }
      }, 2000);
    });
  });
}

function checkAnswer(userAnswer, correctAnswer, questions, index, answers) {
  nextQuestion.disabled = false;
  for (let i = 0; i < answerButtons.length; i++)
    answerButtons[i].disabled = true;

  let correctAnswerIndex = answers.indexOf(correctAnswer);

  if (userAnswer !== correctAnswer) {
    markAnswerAsWrong(index);
    markAnswerAsCorrect(correctAnswerIndex);
  } else {
    markAnswerAsCorrect(correctAnswerIndex);
    correctAnswersCounter++;
  }

  console.log();
  if (++currentQuestion < questions.results.length) {
    nextQuestion.onclick = function () {
      resetAnswerButtons(index, correctAnswerIndex);
      showQuizQuestions(questions);
    };
  } else {
    nextQuestion.onclick = () => {
      questionCard.style.display = "none";
      a(
        correctAnswersCounter,
        questions.results[0].difficulty,
        questions.results[0].category
      );
    };
  }
}

function markAnswerAsWrong(index) {
  answerButtons[index].classList.add("wrong-answer");
}

function markAnswerAsCorrect(index) {
  answerButtons[index].classList.add("correct-answer");
}
function resetAnswerButtons(index, correctAnswerIndex) {
  answerButtons[index].classList.remove("wrong-answer");
  answerButtons[correctAnswerIndex].classList.remove("correct-answer");
  answerButtons[index].classList.remove("selected-answer");
}
function resetSelectedAnswer(index) {
  answerButtons[index].classList.remove("selected-answer");
}

export { showQuizQuestions };
