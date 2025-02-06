const scoreContainer = document.getElementById("quiz-score-container");
const heading = document.createElement("h2");
const description = document.createElement("p");
const resetButton = document.createElement("button");

heading.classList.add("score-heading");
description.classList.add("score-description");
resetButton.classList.add("starting-page-btn");

function a(correctAnswersCounter) {
  const descriptionContent = {
    0: "It looks like this quiz was quite challenging. Don't be discouraged—every mistake is an opportunity to learn.",
    1: "You got one correct answer. Keep practicing, and you'll see improvement in no time.",
    2: "You're making progress! With a little more effort, you'll achieve even better results.",
    3: "A solid performance! You have a good understanding, and with some refinement, you can reach the top.",
    4: "Well done! You're just one step away from a perfect score. Keep up the great work!",
    5: "Excellent job! You demonstrated a strong grasp of the material. Keep challenging yourself to learn even more!",
  };

  heading.innerHTML = `Your score: ${correctAnswersCounter} / 5`;
  description.innerHTML = descriptionContent[correctAnswersCounter];
  resetButton.innerHTML = "Starting page";

  scoreContainer.appendChild(heading);
  scoreContainer.appendChild(description);
  scoreContainer.appendChild(resetButton);

  resetButton.onclick = () => {
    window.location.href = "index.html";
  };
}
export { a };
