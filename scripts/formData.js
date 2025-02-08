import { fetchQuizData } from "./fetchQuiz.js";
import { showQuizQuestions } from "./showQuestions.js";

const userForm = document.getElementById("form-quiz");
const listOfScores = document.getElementById("list-of-scores");
const previousScores = document.querySelector(".previous-scores");

let questions;

let players = [];

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    try {
      const parsedValue = JSON.parse(value);
      if (parsedValue && parsedValue.numberOfCorrectAnswers !== undefined) {
        players.push({ playerName: key, ...parsedValue });
      }
    } catch (error) {
      console.log(`Skipping invalid JSON for key ${key}`);
    }
  }

  players.forEach((player) => {
    const scoreItem = document.createElement("li");
    const score = document.createElement("p");

    score.innerHTML = `<i>Player name:</i> ${player.playerName},&nbsp; <i>number of correct answers: 
    </i> ${player.numberOfCorrectAnswers} / 5,&nbsp; <i>difficulty: </i>${player.difficulty},&nbsp; <i>category: 
    </i>${player.category},&nbsp; <i>date: </i>${player.date},&nbsp; <i>time: </i>${player.time}`;

    scoreItem.appendChild(score);
    listOfScores.appendChild(scoreItem);
  });
  if (players.length === 0) {
    const listItem = document.createElement("li");
    listItem.innerHTML = "No previous scores";
    listItem.classList.add("no-previous-scores");
    listOfScores.appendChild(listItem);
  }
});

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const playerName = document.getElementById("player-name").value;
  const category = document.getElementById("select-category").value;
  const difficulty = document.getElementById("select-difficulty").value;
  const type = document.getElementById("select-type").value;

  localStorage.setItem("player name", playerName);

  let query = `?difficulty=${difficulty}&type=${type}`;

  if (category) query += `&category=${category}`;

  questions = await fetchQuizData(category, difficulty, type);

  if (questions.results.length < 5) {
    alert(
      "There is no enough quesstions for selected parametrs. \nChange parametrs and try again"
    );
    return;
  }

  hideForm();
});

function hideForm() {
  const startButton = document.getElementById("start-quiz");

  userForm.classList.add("hide");
  startButton.classList.add("show");

  startButton.addEventListener("click", () => {
    startButton.classList.remove("show");
    previousScores.style.display = "none";
    showQuizQuestions(questions);
  });
}
