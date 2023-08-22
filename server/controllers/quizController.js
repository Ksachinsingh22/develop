const Quiz = require("../models/Quiz");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

// Fetch a quiz by its quizId == fetch from input field
exports.getQuizByQuizId = async (req, res) => {
  try {
    // console.log(req.params.quizId);

    const quiz = await Quiz.findOne({ quizId: req.params.quizId });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    // console.log("after ", quiz);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

// ------------------------------------------------------------------------------

// const Quiz = require("../models/Quiz");

// // Create a new quiz
// exports.createQuiz = async (req, res) => {
//   try {
//     const newQuiz = new Quiz(req.body);
//     const savedQuiz = await newQuiz.save();
//     res.status(201).json(savedQuiz);
//   } catch (error) {
//     console.error("Error details:", error);
//     res.status(500).json({ error: "Failed to create quiz" });
//   }
// };

// // Fetch a quiz by its ID
// exports.getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.quizId);
//     if (!quiz) return res.status(404).json({ error: "Quiz not found" });
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch quiz" });
//   }
// };

// // Edit a quiz
// exports.editQuiz = async (req, res) => {
//   try {
//     const updatedQuiz = await Quiz.findByIdAndUpdate(
//       req.params.quizId,
//       req.body,
//       { new: true }
//     );
//     if (!updatedQuiz) return res.status(404).json({ error: "Quiz not found" });
//     res.json(updatedQuiz);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to edit quiz" });
//   }
// };

// // Delete a quiz
// exports.deleteQuiz = async (req, res) => {
//   try {
//     const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizId);
//     if (!deletedQuiz) return res.status(404).json({ error: "Quiz not found" });
//     res.json({ message: "Quiz deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete quiz" });
//   }
// };

// // Fetch a quiz by its quizId
// exports.getQuizByQuizId = async (req, res) => {
//   try {
//     console.log(req.params.quizId);
//     const quiz = await Quiz.findOne({ quizId: req.params.quizId });
//     if (!quiz) return res.status(404).json({ error: "Quiz not found" });
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch quiz" });
//   }
// };
