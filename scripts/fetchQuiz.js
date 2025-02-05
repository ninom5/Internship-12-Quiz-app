async function fetchQuizData(category, difficulty, type) {
  let fetchUrl = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=${type}`;

  if (category) fetchUrl += `&category=${category}`;

  console.log(fetchUrl);
  try {
    const apiResponse = await fetch(fetchUrl);
    if (!apiResponse.ok) throw new Error("Error while getting quiz data");

    const data = await apiResponse.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error while fetching data", error);
  }
}

export { fetchQuizData };
