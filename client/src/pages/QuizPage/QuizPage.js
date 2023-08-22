import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const username = useSelector((state) => state.auth.user?.username || "");

  const location = useLocation();
  const navigate = useNavigate();
  const fetchedQuizData = location.state?.quizData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(fetchedQuizData?.timeOfQuiz * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, fetchedQuizData.quizId, navigate]);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);

    let quizTaken = JSON.parse(sessionStorage.getItem("quizTaken")) || {};
    if (!quizTaken[fetchedQuizData.quizId]) {
      quizTaken[fetchedQuizData.quizId] = [];
    }
    quizTaken[fetchedQuizData.quizId][currentQuestionIndex] = {
      questionId: currentQuestion.questionId,
      optionId: optionId,
    };
    sessionStorage.setItem("quizTaken", JSON.stringify(quizTaken));
  };

  const handleNext = () => {
    if (currentQuestionIndex < fetchedQuizData.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
  };

  const currentQuestion = fetchedQuizData.quiz[currentQuestionIndex];

  const sendDataToBackend = async () => {
    const data = JSON.parse(sessionStorage.getItem("quizTaken"));
    const payload = {
      username: username,
      quizTaken: data,
    };

    try {
      await axios.patch("/api/users/saveQuizResults", payload);
      alert("Quiz results saved successfully!");
    } catch (error) {
      console.error("Failed to save quiz results", error);
      alert("Failed to save quiz results. Please try again.");
    }
  };

  const submitQuiz = () => {
    if (fetchedQuizData.quizId !== "xxx00") {
      sendDataToBackend();
    }
    sessionStorage.removeItem("quizTaken");
    alert("Quiz submitted successfully!");
    navigate(fetchedQuizData.quizId === "xxx00" ? "/" : "/dashboard");
  };

  return (
    <div className="quiz-container">
      <div className="question-navigation">
        {fetchedQuizData.quiz.map((_, index) => (
          <button
            key={index}
            onClick={() => handleJumpToQuestion(index)}
            className={currentQuestionIndex === index ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="quiz-content">
        <h2>{fetchedQuizData.quizName}</h2>
        <div className="timer">
          <h3>
            Time Left : {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </h3>
        </div>

        <h2>{currentQuestion.questionText}</h2>
        <div className="options">
          <h3>
            {currentQuestion.options.map((option) => (
              <label key={option.optionId}>
                <input
                  type="radio"
                  value={option.optionId}
                  checked={selectedOption === option.optionId}
                  onChange={() => handleOptionChange(option.optionId)}
                />
                {option.optionText}
              </label>
            ))}
          </h3>
        </div>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === fetchedQuizData.quiz.length - 1}
        >
          Next
        </button>
        <button onClick={submitQuiz}>Submit</button>
      </div>
    </div>
  );
};

export default QuizPage;

// -------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios"; // Assuming you're using axios for HTTP requests
// import { useSelector } from "react-redux";

// const QuizPage = () => {
//   const username = useSelector((state) => state.auth.user?.username || "");

//   const location = useLocation();
//   const navigate = useNavigate();
//   const fetchedQuizData = location.state?.quizData;

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(fetchedQuizData?.timeOfQuiz * 60); // Convert minutes to seconds

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       if (fetchedQuizData.quizId !== "xxx00") {
//         // Send data to backend
//         sendDataToBackend();
//       }
//       sessionStorage.removeItem("quizTaken");
//       alert("Time is Up");
//       navigate(fetchedQuizData.quizId === "xxx00" ? "/" : "/dashboard");
//     } else {
//       const timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft, fetchedQuizData.quizId, navigate]);

//   const handleOptionChange = (optionId) => {
//     setSelectedOption(optionId);

//     let quizTaken = JSON.parse(sessionStorage.getItem("quizTaken")) || {};
//     if (!quizTaken[fetchedQuizData.quizId]) {
//       quizTaken[fetchedQuizData.quizId] = [];
//     }
//     quizTaken[fetchedQuizData.quizId][currentQuestionIndex] = {
//       questionId: currentQuestion.questionId,
//       optionId: optionId,
//     };
//     sessionStorage.setItem("quizTaken", JSON.stringify(quizTaken));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < fetchedQuizData.quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null); // Reset the selected option
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setSelectedOption(null); // Reset the selected option
//     }
//   };

//   const handleJumpToQuestion = (index) => {
//     setCurrentQuestionIndex(index);
//     setSelectedOption(null); // Reset the selected option
//   };

//   const currentQuestion = fetchedQuizData.quiz[currentQuestionIndex];

//   const sendDataToBackend = async () => {
//     const data = JSON.parse(sessionStorage.getItem("quizTaken"));
//     // const username = localStorage.getItem("username");

//     const payload = {
//       username: username,
//       quizTaken: data,
//     };
//     console.log("===>>> ", payload);

//     try {
//       await axios.patch("/api/users/saveQuizResults", payload);
//       alert("Quiz results saved successfully!");
//     } catch (error) {
//       console.error("Failed to save quiz results", error);
//       alert("Failed to save quiz results. Please try again.");
//     }
//   };

//   return (
//     <div className="quiz-container">
//       <div className="question-navigation">
//         {fetchedQuizData.quiz.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleJumpToQuestion(index)}
//             className={currentQuestionIndex === index ? "active" : ""}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       <div className="quiz-content">
//         <h2>{fetchedQuizData.quizName}</h2>
//         <div className="timer">
//           <h3>
//             Time Left : {Math.floor(timeLeft / 60)}:
//             {timeLeft % 60 < 10 ? "0" : ""}
//             {timeLeft % 60}
//           </h3>
//         </div>

//         <h2>{currentQuestion.questionText}</h2>
//         <div className="options">
//           <h3>
//             {currentQuestion.options.map((option) => (
//               <label key={option.optionId}>
//                 <input
//                   type="radio"
//                   value={option.optionId}
//                   checked={selectedOption === option.optionId}
//                   onChange={() => handleOptionChange(option.optionId)}
//                 />
//                 {option.optionText}
//               </label>
//             ))}
//           </h3>
//         </div>
//         <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentQuestionIndex === fetchedQuizData.quiz.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;

// ----------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const QuizPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const fetchedQuizData = location.state?.quizData;

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(fetchedQuizData?.timeOfQuiz * 60); // Convert minutes to seconds

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       alert("Time is Up");
//       if (fetchedQuizData.quizId === "xxx00") {
//         navigate("/");
//       } else {
//         navigate("/dashboard");
//       }
//     } else {
//       const timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft, fetchedQuizData, navigate]);

//   const handleOptionChange = (optionId) => {
//     setSelectedOption(optionId);
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < fetchedQuizData.quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null); // Reset the selected option
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setSelectedOption(null); // Reset the selected option
//     }
//   };

//   const handleJumpToQuestion = (index) => {
//     setCurrentQuestionIndex(index);
//     setSelectedOption(null); // Reset the selected option
//   };

//   const currentQuestion = fetchedQuizData.quiz[currentQuestionIndex];

//   return (
//     <div className="quiz-container">
//       <div className="question-navigation">
//         {fetchedQuizData.quiz.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleJumpToQuestion(index)}
//             className={currentQuestionIndex === index ? "active" : ""}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       <div className="quiz-content">
//         <h2>{fetchedQuizData.quizName}</h2>
//         <div className="timer">
//           <h3>
//             Time Left : {Math.floor(timeLeft / 60)}:
//             {timeLeft % 60 < 10 ? "0" : ""}
//             {timeLeft % 60}
//           </h3>
//         </div>

//         <h2>{currentQuestion.questionText}</h2>
//         <div className="options">
//           <h3>
//             {currentQuestion.options.map((option) => (
//               <label key={option.optionId}>
//                 <input
//                   type="radio"
//                   value={option.optionId}
//                   checked={selectedOption === option.optionId}
//                   onChange={() => handleOptionChange(option.optionId)}
//                 />
//                 {option.optionText}
//               </label>
//             ))}
//           </h3>
//         </div>
//         <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentQuestionIndex === fetchedQuizData.quiz.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;
