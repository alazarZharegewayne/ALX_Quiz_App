import axios from "axios";

const API_URL = "https://opentdb.com/api.php";

export const fetchQuizQuestions = async (amount, category, difficulty) => {
  const response = await axios.get(API_URL, {
    params: { amount, category, difficulty, type: "multiple" },
  });
  return response.data.results;
};

export const fetchCategories = async () => {
  const response = await axios.get("https://opentdb.com/api_category.php");
  return response.data.trivia_categories;
};