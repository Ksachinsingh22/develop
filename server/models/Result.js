const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  results: {
    type: Map,
    of: [
      {
        quizId: String,
        questions: [
          {
            questionId: String,
            optionId: String,
          },
        ],
      },
    ],
    default: {},
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
