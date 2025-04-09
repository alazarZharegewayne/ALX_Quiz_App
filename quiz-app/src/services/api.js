import axios from "axios";

const API_URL = "https://opentdb.com/api.php";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchQuizQuestions = async (amount, category, difficulty) => {
  try {
    const response = await axios.get(API_URL, {
      params: { amount, category, difficulty, type: "multiple" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
