const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizByQuizId,
} = require("../controllers/quizController");

// Create a new quiz
router.post("/create", createQuiz);

// Fetch a quiz by its quizId
router.get("/:quizId", getQuizByQuizId);

module.exports = router;

// -------------------------------------------------

// const express = require("express");
// const router = express.Router();

// const {
//   createQuiz,
//   getQuizById,
//   editQuiz,
//   deleteQuiz,
//   getQuizByQuizId,
// } = require("../controllers/quizController");

// // Create a new quiz
// router.post("/create", createQuiz);

// // Fetch a quiz by its MongoDB ID
// router.get("/id/:quizId", getQuizById);

// // Fetch a quiz by its quizId
// router.get("/:quizId", getQuizByQuizId);

// // Edit a quiz
// router.put("/edit/:quizId", editQuiz);

// // Delete a quiz
// router.delete("/delete/:quizId", deleteQuiz);

// module.exports = router;
