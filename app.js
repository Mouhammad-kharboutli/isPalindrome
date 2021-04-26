const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// connect to local DB
mongoose.connect("mongodb://localhost:27017/isPalindromeDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const phraseSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: [1, "please enter a word"],
  },
  isPalindrome: String,
});

const Phrase = mongoose.model("Phrase", phraseSchema);

const racecar = new Phrase({
  phrase: "racecar",
  isPalindrome: isPalindrome("racecar"),
});

const drop = new Phrase({
  phrase: "drop",
  isPalindrome: isPalindrome("drop"),
});

//  -----------------------Request targetting all words ---------------------------

app
  .route("/phrases")

  // get all messages and sent as JSON file without any front end development
  .get(function (req, res) {
    Phrase.find(function (err, foundresults) {
      if (!err) {
        if (foundresults) {
          res.send(foundresults);
        }
      } else {
        res.send(err);
      }
    });
  })

  // Post a new message
  .post(function (req, res) {
    const newPhrase = Phrase({
      phrase: req.body.phrase,
      isPalindrome: isPalindrome(req.body.phrase),
    });
    newPhrase.save(function (err) {
      if (!err) {
        res.send("Phrase added successfully");
      } else {
        res.send(err);
      }
    });
  })

  // delete all messages
  .delete(function (req, res) {
    Phrase.deleteMany(function (err) {
      if (!err) {
        res.send("All phrases are deleted successfully");
      } else {
        res.send(err);
      }
    });
  });

//  -----------------------Request targetting a specific word ---------------------------
app
  .route("/phrases/:customPhrase")

  // GET a Specific word
  .get(function (req, res) {
    Phrase.findOne(
      { phrase: req.params.customPhrase },
      function (err, foundPhrase) {
        if (!err) {
          if (foundPhrase) {
            res.send(foundPhrase);
          } else {
            res.send("The phrase you are looking for does not exist");
          }
        } else {
          res.send(err);
        }
      }
    );
  })

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

function isPalindrome(str) {
  if (
    str.replace(/[\W_]/g, "").toLowerCase() ===
    str.replace(/[\W_]/g, "").toLowerCase().split("").reverse().join("")
  ) {
    return "The phrase is Palindrome";
  } else {
    return "The phrase is NOT Palindrome";
  }
}

// -------------------Testing------------------------
// ------Palindrome
// console.log(isPalindrome("racecar"));
// console.log(isPalindrome("Don't nod."));
// console.log(isPalindrome("Eva, can I see bees in a cave?"));
// ------NOT Palindrome
// console.log(isPalindrome("raceccar"));
