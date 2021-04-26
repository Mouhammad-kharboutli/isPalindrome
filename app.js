const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/isPalindromeDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [1, "please enter a word"],
  },
  isPalindrome: String,
});

const Word = mongoose.model("Word", wordSchema);

const racecar = new Word({
  word: "racecar",
  isPalindrome: isPalindrome("racecar"),
});

//  -----------------------Request targetting all words ---------------------------

app
  .route("/")

  // get all messages and sent as JSON file without any front end development
  .get(function (req, res) {})

  // Post a new message
  .post(function (req, res) {})

  // delete all messages
  .delete(function (req, res) {});

//  -----------------------Request targetting a specific word ---------------------------
app
  .route("/:customPhrase")

  // GET a Specific word
  .get(function (req, res) {})

  // Put a new message
  .put(function (req, res) {})

  // Patch a new message
  .patch(function (req, res) {})

  // delete all messages
  .delete(function (req, res) {});

// Port will be chosen dynamically from the server provider
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server has started successfully");
});
