import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./CreateQuizPage.css";

const CreateQuizPage = () => {
  const username = useSelector((state) => state.auth.user?.username || "");

  const [quizName, setQuizName] = useState("**Not Set**");
  const [marksPerQuestion, setMarksPerQuestion] = useState(1);
  const [instructions, setInstructions] = useState([
    "**Best Of Luck**",
    "**Read Question's before Answering**",
  ]);
  const [timeOfQuiz, setTimeOfQuiz] = useState(15); // default 15 mins
  const [startTime, setStartTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizName = sessionStorage.getItem("quizName");
    const storedMarksPerQuestion = sessionStorage.getItem("marksPerQuestion");
    const storedInstructions = JSON.parse(
      sessionStorage.getItem("instructions")
    );
    const storedStartTime = sessionStorage.getItem("startTime");

    if (storedQuizName) setQuizName(storedQuizName);
    if (storedMarksPerQuestion) setMarksPerQuestion(storedMarksPerQuestion);
    if (storedInstructions) setInstructions(storedInstructions);
    if (storedStartTime) setStartTime(storedStartTime);
  }, []);

  const generateQuizId = () => {
    const letters = "a1bc2de3fg7hi54jkl0mn6op3qrst8uvwx9yz";
    let randomLetters = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomLetters += letters.charAt(randomIndex);
    }
    return randomLetters;
  };

  const handleAddEditClick = () => {
    sessionStorage.setItem("quizName", quizName);
    sessionStorage.setItem("marksPerQuestion", marksPerQuestion);
    sessionStorage.setItem("instructions", JSON.stringify(instructions));
    sessionStorage.setItem("startTime", startTime);
    navigate("/quiz-add-edit");
  };

  const handleSubmit = async () => {
    const storedQuestions = JSON.parse(sessionStorage.getItem("tempQuestions"));

    storedQuestions.forEach((question, index) => {
      question.questionId = (1000 + index).toString();
      question.options.forEach((option, oIndex) => {
        const optionLetter = String.fromCharCode(65 + oIndex);
        option.optionId = question.questionId + optionLetter;
      });
    });

    const generatedQuizId = generateQuizId();

    const quizData = {
      quizId: generatedQuizId,
      quizName,
      timeOfQuiz,
      startTime,
      marksPerQuestion: Number(marksPerQuestion),
      instructions,
      // result: 0, // Default result value set to 0
      quiz: storedQuestions,
    };

    const updatingQuizId = {
      username,
      quizId: generatedQuizId,
    };

    try {
      await axios.post("/api/quiz/create", quizData);

      try {
        await axios.patch("/api/users/addQuizToUser", updatingQuizId);
        alert("Quiz created. Quiz ID = " + generatedQuizId);
      } catch (error) {
        console.error("Failed to add quiz to user", error);
      }

      setQuizName("");
      setMarksPerQuestion("");
      setInstructions(["", ""]);
      setTimeOfQuiz(15);
      setStartTime("");

      sessionStorage.removeItem("quizName");
      sessionStorage.removeItem("marksPerQuestion");
      sessionStorage.removeItem("instructions");
      sessionStorage.removeItem("tempQuestions");
      sessionStorage.removeItem("startTime");

      navigate("/");
    } catch (error) {
      console.error("Failed to save the quiz", error);
      alert("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="quiz-name-section">
        <label>Quiz Name:</label>
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="Enter the name of the quiz"
        />
      </div>

      <div className="questions-section">
        <h2>Add Questions & Answers</h2>
        <button onClick={handleAddEditClick}>Add / Edit</button>
        <p>
          Total no of questions Added:
          {JSON.parse(sessionStorage.getItem("tempQuestions"))?.length || 0}
        </p>
        <label>Each Question is of:</label>
        <input
          type="number"
          min="1"
          max="4"
          value={marksPerQuestion}
          onChange={(e) => setMarksPerQuestion(e.target.value)}
          placeholder="Marks per question"
        />
      </div>

      <div className="instructions-section">
        <h2>Instructions to be displayed to students</h2>
        {instructions.map((instruction, index) => (
          <input
            key={index}
            type="text"
            value={instruction}
            onChange={(e) => {
              const newInstructions = [...instructions];
              newInstructions[index] = e.target.value;
              setInstructions(newInstructions);
            }}
            placeholder={`Instruction ${index + 1}`}
          />
        ))}
      </div>

      <div className="time-section">
        <label>Time of Quiz (in minutes):</label>
        <input
          type="number"
          value={timeOfQuiz}
          onChange={(e) => setTimeOfQuiz(e.target.value)}
          placeholder="Time of Quiz (in minutes)"
        />

        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuizPage;

// -------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "./CreateQuizPage.css";

// const CreateQuizPage = () => {
//   const username = useSelector((state) => state.auth.user?.username || "");

//   const [quizName, setQuizName] = useState("**Not Set**");
//   const [marksPerQuestion, setMarksPerQuestion] = useState(1);
//   const [instructions, setInstructions] = useState([
//     "**Best Of Luck**",
//     "**Read Question's before Answering**",
//   ]);
//   const [timeOfQuiz, setTimeOfQuiz] = useState(15); // default 15 mins
//   const [startTime, setStartTime] = useState("");
//   const [result, setResult] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedQuizName = sessionStorage.getItem("quizName");
//     const storedMarksPerQuestion = sessionStorage.getItem("marksPerQuestion");
//     const storedInstructions = JSON.parse(
//       sessionStorage.getItem("instructions")
//     );
//     const storedStartTime = sessionStorage.getItem("startTime");

//     if (storedQuizName) setQuizName(storedQuizName);
//     if (storedMarksPerQuestion) setMarksPerQuestion(storedMarksPerQuestion);
//     if (storedInstructions) setInstructions(storedInstructions);
//     if (storedStartTime) setStartTime(storedStartTime);
//   }, []);

//   const generateQuizId = () => {
//     const letters = "a1bc2de3fg7hi54jkl0mn6op3qrst8uvwx9yz";
//     let randomLetters = "";
//     for (let i = 0; i < 5; i++) {
//       const randomIndex = Math.floor(Math.random() * letters.length);
//       randomLetters += letters.charAt(randomIndex);
//     }
//     return randomLetters;
//   };

//   const handleAddEditClick = () => {
//     sessionStorage.setItem("quizName", quizName);
//     sessionStorage.setItem("marksPerQuestion", marksPerQuestion);
//     sessionStorage.setItem("instructions", JSON.stringify(instructions));
//     sessionStorage.setItem("startTime", startTime);
//     navigate("/quiz-add-edit");
//   };

//   const handleSubmit = async () => {
//     const storedQuestions = JSON.parse(sessionStorage.getItem("tempQuestions"));

//     storedQuestions.forEach((question, index) => {
//       question.questionId = (1000 + index).toString(); // starting from 1000, incrementing for each question
//       question.options.forEach((option, oIndex) => {
//         const optionLetter = String.fromCharCode(65 + oIndex); // 65 is ASCII for 'A'
//         option.optionId = question.questionId + optionLetter;
//       });
//     });

//     const generatedQuizId = generateQuizId();

//     const quizData = {
//       quizId: generatedQuizId,
//       quizName,
//       timeOfQuiz,
//       startTime,
//       marksPerQuestion: Number(marksPerQuestion),
//       instructions,
//       result,
//       quiz: storedQuestions,
//     };

//     const updatingQuizId = {
//       username,
//       quizId: generatedQuizId,
//     };

//     try {
//       await axios.post("/api/quiz/create", quizData);

//       try {
//         await axios.patch("/api/users/addQuizToUser", updatingQuizId);
//         alert("Quiz created. Quiz ID = " + generatedQuizId);
//       } catch (error) {
//         console.error("Failed to add quiz to user", error);
//       }

//       setQuizName("");
//       setMarksPerQuestion("");
//       setInstructions(["", ""]);
//       setTimeOfQuiz(15);
//       setStartTime("");
//       setResult(0);

//       sessionStorage.removeItem("quizName");
//       sessionStorage.removeItem("marksPerQuestion");
//       sessionStorage.removeItem("instructions");
//       sessionStorage.removeItem("tempQuestions");
//       sessionStorage.removeItem("startTime");

//       navigate("/");
//     } catch (error) {
//       console.error("Failed to save the quiz", error);
//       alert("Failed to create quiz. Please try again.");
//     }
//   };

//   return (
//     <div className="create-quiz-container">
//       <div className="quiz-name-section">
//         <label>Quiz Name:</label>
//         <input
//           type="text"
//           value={quizName}
//           onChange={(e) => setQuizName(e.target.value)}
//           placeholder="Enter the name of the quiz"
//         />
//       </div>

//       <div className="questions-section">
//         <h2>Add Questions & Answers</h2>
//         <button onClick={handleAddEditClick}>Add / Edit</button>

//         <p>
//           Total no of questions Added:{" "}
//           {JSON.parse(sessionStorage.getItem("tempQuestions"))?.length || 0}
//         </p>

//         <label>Each Question is of:</label>
//         <input
//           type="number"
//           min="1"
//           max="4"
//           value={marksPerQuestion}
//           onChange={(e) => setMarksPerQuestion(e.target.value)}
//           placeholder="Marks per question"
//         />
//       </div>

//       <div className="instructions-section">
//         <h2>Instructions to be displayed to students</h2>
//         {instructions.map((instruction, index) => (
//           <input
//             key={index}
//             type="text"
//             value={instruction}
//             onChange={(e) => {
//               const newInstructions = [...instructions];
//               newInstructions[index] = e.target.value;
//               setInstructions(newInstructions);
//             }}
//             placeholder={`Instruction ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="time-section">
//         <label>Time of Quiz (in minutes):</label>
//         <input
//           type="number"
//           value={timeOfQuiz}
//           onChange={(e) => setTimeOfQuiz(e.target.value)}
//           placeholder="Time of Quiz (in minutes)"
//         />

//         <label>Start Time:</label>
//         <input
//           type="datetime-local"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//       </div>

//       <div className="result-section">
//         <label>Result:</label>
//         <input
//           type="number"
//           value={result}
//           onChange={(e) => setResult(e.target.value)}
//           placeholder="Result"
//         />
//       </div>

//       <button onClick={handleSubmit}>Submit Quiz</button>
//     </div>
//   );
// };

// export default CreateQuizPage;

// ---------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "./CreateQuizPage.css";

// const CreateQuizPage = () => {
//   const username = useSelector((state) => state.auth.user?.username || "");

//   const [quizName, setQuizName] = useState("**Not Set**");
//   const [marksPerQuestion, setMarksPerQuestion] = useState(1);
//   const [instructions, setInstructions] = useState([
//     "**Best Of Luck**",
//     "**Read Question's before Answering**",
//   ]);
//   const [timeOfQuiz, setTimeOfQuiz] = useState(15); // default 15 mins
//   const [startTime, setStartTime] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedQuizName = sessionStorage.getItem("quizName");
//     const storedMarksPerQuestion = sessionStorage.getItem("marksPerQuestion");
//     const storedInstructions = JSON.parse(
//       sessionStorage.getItem("instructions")
//     );
//     const storedQuestions = JSON.parse(sessionStorage.getItem("tempQuestions"));
//     const storedStartTime = sessionStorage.getItem("startTime");

//     if (storedQuizName) setQuizName(storedQuizName);
//     if (storedMarksPerQuestion) setMarksPerQuestion(storedMarksPerQuestion);
//     if (storedInstructions) setInstructions(storedInstructions);
//     if (storedQuestions) setTotalQuestions(storedQuestions.length);
//     if (storedStartTime) setStartTime(storedStartTime);
//   }, []);

//   const generateQuizId = () => {
//     const letters = "a1bc2de3fg7hi54jkl0mn6op3qrst8uvwx9yz";
//     let randomLetters = "";
//     for (let i = 0; i < 5; i++) {
//       const randomIndex = Math.floor(Math.random() * letters.length);
//       randomLetters += letters.charAt(randomIndex);
//     }
//     // const randomNumbers = Math.floor(10 + Math.random() * 90); // generates a random two-digit number
//     return randomLetters;
//   };

//   const handleAddEditClick = () => {
//     sessionStorage.setItem("quizName", quizName);
//     sessionStorage.setItem("marksPerQuestion", marksPerQuestion);
//     sessionStorage.setItem("instructions", JSON.stringify(instructions));
//     sessionStorage.setItem("startTime", startTime);
//     navigate("/quiz-add-edit");
//   };

//   const handleSubmit = async () => {
//     const storedQuestions = JSON.parse(sessionStorage.getItem("tempQuestions"));

//     // console.log("storedQuestions = ", storedQuestions);

//     // Add questionId to each question
//     storedQuestions.forEach((question, index) => {
//       question.questionId = 1000 + index; // starting from 1000, incrementing for each question
//     });

//     const generatedQuizId = generateQuizId();

//     const quizData = {
//       quizId: generatedQuizId,
//       quizName,
//       timeOfQuiz,
//       startTime,
//       totalQuestions: storedQuestions.length,
//       marksPerQuestion: Number(marksPerQuestion),
//       instructions,
//       quiz: storedQuestions,
//     };

//     const updatingQuizId = {
//       username,
//       quizId: generatedQuizId,
//     };

//     try {
//       // console.log(quizData);
//       await axios.post("/api/quiz/create", quizData);

//       // After the quiz is created, add the quizId to the user's quizCreated array
//       try {
//         // console.log("Quiz id = ", generatedQuizId);
//         await axios.patch("/api/users/addQuizToUser", updatingQuizId);
//         // console.log("Quiz added to user successfully.", updatingQuizId);
//         // console.log("Username == ", username);
//         // console.log(generatedQuizId);
//         alert("Quiz created. Quiz ID = " + generatedQuizId);
//       } catch (error) {
//         console.error("Failed to add quiz to user", error);
//       }

//       // Reset the fields
//       setQuizName("");
//       setMarksPerQuestion("");
//       setInstructions(["", ""]);
//       setTimeOfQuiz(15);
//       setStartTime("");
//       setTotalQuestions(0);

//       // Clear the session storage
//       sessionStorage.removeItem("quizName");
//       sessionStorage.removeItem("marksPerQuestion");
//       sessionStorage.removeItem("instructions");
//       sessionStorage.removeItem("tempQuestions");
//       sessionStorage.removeItem("startTime");

//       // navigate to home page
//       navigate("/");
//     } catch (error) {
//       console.error("Failed to save the quiz", error);
//       alert("Failed to create quiz. Please try again.");
//     }
//   };

//   return (
//     <div className="create-quiz-container">
//       <div className="quiz-name-section">
//         <label>Quiz Name:</label>
//         <input
//           type="text"
//           value={quizName}
//           onChange={(e) => setQuizName(e.target.value)}
//           placeholder="Enter the name of the quiz"
//         />
//       </div>

//       <div className="questions-section">
//         <h2>Add Questions & Answers</h2>
//         <button onClick={handleAddEditClick}>Add / Edit</button>
//         <p>Total no of questions Added: {totalQuestions}</p>
//         <label>Each Question is of:</label>
//         <input
//           type="number"
//           min="1"
//           max="4"
//           value={marksPerQuestion}
//           onChange={(e) => setMarksPerQuestion(e.target.value)}
//           placeholder="Marks per question"
//         />
//       </div>

//       <div className="instructions-section">
//         <h2>Instructions to be displayed to students</h2>
//         {instructions.map((instruction, index) => (
//           <input
//             key={index}
//             type="text"
//             value={instruction}
//             onChange={(e) => {
//               const newInstructions = [...instructions];
//               newInstructions[index] = e.target.value;
//               setInstructions(newInstructions);
//             }}
//             placeholder={`Instruction ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="time-section">
//         <label>Time of Quiz (in minutes):</label>
//         <input
//           type="number"
//           value={timeOfQuiz}
//           onChange={(e) => setTimeOfQuiz(e.target.value)}
//           placeholder="Time of Quiz (in minutes)"
//         />

//         <label>Start Time:</label>
//         <input
//           type="datetime-local"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//       </div>

//       <button onClick={handleSubmit}>Submit Quiz</button>
//     </div>
//   );
// };

// export default CreateQuizPage;
