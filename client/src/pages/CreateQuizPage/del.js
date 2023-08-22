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
//         questionId: String,
//         optionId: String,
//       },
//     ],
//     default: {},
//   },
//   quizTaken: {
//     type will be array inside that array each index will be an o,
//     default will be empty
//   },
// });
