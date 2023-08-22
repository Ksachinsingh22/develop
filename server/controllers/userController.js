const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // console.log("Received data backend :", username);

  try {
    // Check if user with the given email already exists
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Check if user with the given username already exists
    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Create a new user instance
    const user = new User({
      name,
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    // console.log(user);
    await user.save();

    // Create a payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT and send it as a response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) {
      res.status(400).send({ msg: "Username or email already exists" });
    } else {
      res.status(500).send("Server error");
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User does not exist. Please register." });
    } else {
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }

      // Create a payload for JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;

          // Exclude sensitive information from the user object
          user.password = undefined;

          // Send the user object along with the token in the response
          res.json({
            token,
            user, // <-- This sends the user object in the response
            msg: "Login successful!",
          });
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// this push the quizId to user
exports.addQuizToUser = async (req, res) => {
  const { username, quizId } = req.body;
  console.log("addQuizToUser function called with:", req.body);

  try {
    await User.findOneAndUpdate(
      { username },
      { $push: { quizCreated: quizId } },
      { new: true }
    );
    res.status(200).json({ msg: "Quiz added to user successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// saves the response questionId and optionId in users collection under quizTaken
exports.saveQuizResults = async (req, res) => {
  try {
    const { username, quizTaken } = req.body;
    console.log("username -- ", username, quizTaken);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // For each quizId in the incoming data
    for (let quizId in quizTaken) {
      if (user.quizTaken.has(quizId)) {
        // If the quizId already exists in the user's quizTaken, append the results
        user.quizTaken.get(quizId).push(...quizTaken[quizId]);
      } else {
        // If the quizId doesn't exist in the user's quizTaken, add it
        user.quizTaken.set(quizId, quizTaken[quizId]);
      }
    }

    await user.save();
    // console.log("Updated user -- ", user);
    res.status(200).send({ message: "Quiz results saved successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Failed to save quiz results" });
  }
};

// this if for demo quiz... first of array
// exports.getQuizCreatedByUsername = async (req, res) => {
//   try {
//     console.log("username u = ", req.params.username);
//     const user = await User.findOne({ username: req.params.username });
//     console.log("user u = ", user.quizCreated[0]);

//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user.quizCreated[0]);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch quizCreated" });
//   }
// };
