const express = require("express");
const router = express.Router();
const { saveUserResult } = require("../controllers/resultController");

router.post("/saveUserResult", saveUserResult);

// Add more routes as needed

module.exports = router;
