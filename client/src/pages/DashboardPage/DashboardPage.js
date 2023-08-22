import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./DashboardPage.css";

function DashboardPage() {
  const [takenQuizzes, setTakenQuizzes] = useState([]);
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Instantiate the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch taken quizzes
        const responseTaken = await axios.get("/path/to/taken/quizzes/api");
        setTakenQuizzes(responseTaken.data);

        // Fetch created quizzes
        const responseCreated = await axios.get("/path/to/created/quizzes/api");
        setCreatedQuizzes(responseCreated.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateQuiz = () => {
    navigate("/createquiz"); // Redirect to CreateQuizPage
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Part 1 */}
        <div className="dashboard-sidebar">
          {/* Part 1.1 */}
          <div className="taken-quiz">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              takenQuizzes.map((quiz) => (
                <div key={quiz.id}>
                  {quiz.name} {/* Adjust based on your data structure */}
                </div>
              ))
            )}
          </div>
          {/* Part 1.2 */}
          <div className="created-quiz">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              createdQuizzes.map((quiz) => (
                <div key={quiz.id}>
                  {quiz.name} {/* Adjust based on your data structure */}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Part 2 */}
        <div className="quiz-info">
          {/* Display selected quiz information here */}
          <button onClick={handleCreateQuiz}>Create New Quiz</button>
          <button>Edit Quiz</button>
          <button>Delete Quiz</button>
        </div>

        {/* Part 3 */}
        <div className="quiz-display">
          {/* Display the quiz questions and answers here */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
