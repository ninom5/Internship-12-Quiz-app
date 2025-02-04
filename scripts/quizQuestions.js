import { fetchQuizData } from "./fetchQuiz.js";

async function showQuestions() {
  try {
    const urlParams = new URLSearchParams(window.location.search);

    const category = urlParams.get("category");
    const difficulty = urlParams.get("difficulty");
    const type = urlParams.get("type");

    const quizQuestions = await fetchQuizData(category, difficulty, type);
    console.log(quizQuestions);
  } catch (error) {
    console.error("Error while loading questions: ", error);
  }
}

showQuestions();
