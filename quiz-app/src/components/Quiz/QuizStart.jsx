import { useState, useEffect } from "react";
import { fetchCategories } from "../../services/api";

export default function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Quiz Setup</h1>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Any Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="number"
        min="1"
        max="20"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={() => onStart(amount, selectedCategory, difficulty)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
}
