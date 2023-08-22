const Result = require("../models/Result");

exports.saveUserResult = async (req, res) => {
  try {
    const { username, results } = req.body;

    let userResult = await Result.findOne({ username });

    if (!userResult) {
      userResult = new Result({ username, results });
    } else {
      userResult.results = { ...userResult.results.toObject(), ...results };
    }

    await userResult.save();

    res.status(200).send({ message: "Results saved successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to save results" });
  }
};

// Add more controller functions as needed
