import { fetchQuizData } from "./fetchQuiz.js";
import { showQuizQuestions } from "./showQuestions.js";

const userForm = document.getElementById("form-quiz");

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const playerName = document.getElementById("player-name").value;
  const category = document.getElementById("select-category").value;
  const difficulty = document.getElementById("select-difficulty").value;
  const type = document.getElementById("select-type").value;

  localStorage.setItem("player name: ", playerName);

  let query = `?difficulty=${difficulty}&type=${type}`;

  if (category) query += `&category=${category}`;

  fetchQuizData(category, difficulty, type);

  hideForm();
});

function hideForm() {
  const startButton = document.getElementById("start-quiz");

  userForm.classList.add("hide");
  startButton.classList.add("show");

  startButton.addEventListener("click", () => {
    startButton.classList.remove("show");
    showQuizQuestions();
  });
}
