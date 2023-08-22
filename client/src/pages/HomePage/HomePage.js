// import React from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./HomePage.css";

// const HomePage = () => {
//   // const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const handleDemoClick = async () => {
//     try {
//       const response = await axios.get("/api/quiz/xxx00");
//       // console.log(response.data);
//       navigate("/quizpage", { state: { quizData: response.data } });
//     } catch (error) {
//       console.error("Failed to fetch the quiz", error);
//     }
//   };

//   const handleCreateQuizClick = () => {
//     if (auth.isAuthenticated) {
//       // Using Redux state to check authentication
//       navigate("/createquiz");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="hero-section">
//         <h1>Catchy Headline Here</h1>
//         <p>Brief description or tagline.</p>
//         <button onClick={handleCreateQuizClick}>Create Quiz</button>
//         <button onClick={handleDemoClick}>Take a Demo</button>
//       </div>

//       <div className="features-overview">
//         {/* Add features overview content here */}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// // ==-------------------------------------------------------

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./HomePage.css";

// const HomePage = () => {
//   const auth = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [quizIdInput, setQuizIdInput] = useState("");

//   const fetchAndNavigateToQuiz = async (quizId) => {
//     try {
//       const response = await axios.get(`/api/quiz/${quizId}`);
//       const quizData = response.data;

//       // Show the instructions alert
//       alert(quizData.instructions);

//       navigate("/quizpage", { state: { quizData } });
//     } catch (error) {
//       console.error("Failed to fetch the quiz", error);
//     }
//   };

//   const handleDemoClick = () => {
//     fetchAndNavigateToQuiz("xxx00");
//   };

//   const handleStartQuiz = () => {
//     if (!auth.isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     fetchAndNavigateToQuiz(quizIdInput);
//   };

//   const handleCreateQuizClick = () => {
//     if (auth.isAuthenticated) {
//       navigate("/createquiz");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="hero-section">
//         <h1>Catchy Headline Here</h1>
//         <p>Brief description or tagline.</p>
//         <button onClick={handleCreateQuizClick}>Create Quiz</button>
//         <button onClick={handleDemoClick}>Take a Demo</button>
//         <div className="start-quiz-section">
//           <label>Enter Quiz ID to start your Quiz:</label>
//           <input
//             type="text"
//             value={quizIdInput}
//             onChange={(e) => setQuizIdInput(e.target.value)}
//             placeholder="Enter Quiz ID"
//           />
//           <button onClick={handleStartQuiz}>Start Quiz</button>
//         </div>
//       </div>

//       <div className="features-overview">
//         {/* Add features overview content here */}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// ---------------------------------------------------------------------

import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [quizIdInput, setQuizIdInput] = useState("");

  const fetchAndNavigateToQuiz = async (quizId) => {
    try {
      const response = await axios.get(`/api/quiz/${quizId}`);
      const quizData = response.data;

      // Show the instructions alert
      alert(
        "Instructions for the Quiz :-" +
          "\n" +
          "   1. " +
          quizData.instructions[0] +
          "\n" +
          "   2. " +
          quizData.instructions[1] +
          "\n" +
          "\n" +
          "Total time for the Quiz is = " +
          quizData.timeOfQuiz +
          " minutes."
      );

      navigate("/quizpage", { state: { quizData } });
    } catch (error) {
      console.error("Failed to fetch the quiz", error);
    }
  };

  const handleDemoClick = () => {
    fetchAndNavigateToQuiz("xxx00");
  };

  const handleStartQuiz = async () => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchAndNavigateToQuiz(quizIdInput);
  };

  const handleCreateQuizClick = () => {
    if (auth.isAuthenticated) {
      navigate("/createquiz");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Catchy Headline Here</h1>
        <p>Brief description or tagline.</p>
        <button onClick={handleCreateQuizClick}>Create Quiz</button>
        <button onClick={handleDemoClick}>Take a Demo</button>
        <div className="start-quiz-section">
          <label>Enter Quiz ID to start your Quiz:</label>
          <input
            type="text"
            value={quizIdInput}
            onChange={(e) => setQuizIdInput(e.target.value)}
            placeholder="Enter Quiz ID"
          />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>

      <div className="features-overview">
        {/* Add features overview content here */}
      </div>
    </div>
  );
};

export default HomePage;
