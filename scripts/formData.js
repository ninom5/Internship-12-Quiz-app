document
  .getElementById("form-quiz")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const category = document.getElementById("select-category").value;
    const difficulty = document.getElementById("select-difficulty").value;
    const type = document.getElementById("select-type").value;

    localStorage.setItem("player name: ", playerName);

    const query = `?category=${category}&difficulty=${difficulty}&type=${type}`;

    window.location.href = `quizPage.html${query}`;
  });
