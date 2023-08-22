const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 15,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    validate: {
      validator: function (v) {
        // This regex checks if there are at least 2 numbers in the string
        return /\d.*\d/.test(v);
      },
      message: (props) => `${props.value} should have at least 2 numbers!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  quizCreated: {
    type: [String], // This denotes an array of strings
    default: null,
  },
  quizTaken: {
    type: Map,
    of: [
      {
        questionId: String,
        optionId: String,
      },
    ],
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// ------------------------------------

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 2,
//     maxlength: 15,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 5,
//     validate: {
//       validator: function (v) {
//         // This regex checks if there are at least 2 numbers in the string
//         return /\d.*\d/.test(v);
//       },
//       message: (props) => `${props.value} should have at least 2 numbers!`,
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//   },
//   quizCreated: {
//     type: [String], // This denotes an array of strings
//     default: null,
//   },
//   quizTaken: {
//     type: Map,
//     of: [
//       {
//         questionId: {
//           type: String,
//           default: null,
//         },
//         optionId: {
//           type: String,
//           default: null,
//         },
//       },
//     ],
//     default: null,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

// ----------------------------------------------------------------------------

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 2,
//     maxlength: 15,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 5,

//     validate: {
//       validator: function (v) {
//         // This regex checks if there are at least 2 numbers in the string
//         return /\d.*\d/.test(v);
//       },
//       message: (props) => `${props.value} should have at least 2 numbers!`,
//     },
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//   },
//   quizCreated: {
//     type: [String], // This denotes an array of strings
//     default: null,
//   },
//   quizTaken: {
//     type: [String], // This denotes an array of strings
//     default: null,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

/*


  "quizTaken": {
  "quizId": [
    {"questionId": "optionId"},
    // rest question and option
  ],
  // rest quiz...
}




"quizTaken": [
  [
    "quizId": [
    {"questionId": "optionId"},
    // rest question and option
  ],
  // rest quiz...
]
]


  */
