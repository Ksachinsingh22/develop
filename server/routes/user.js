const express = require("express");
const router = express.Router();

const {
  addQuizToUser,
  registerUser,
  loginUser,
  saveQuizResults,
} = require("../controllers/userController");

// Register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/addQuizToUser", addQuizToUser);

router.patch("/saveQuizResults", saveQuizResults);

// ... other routes

module.exports = router;
