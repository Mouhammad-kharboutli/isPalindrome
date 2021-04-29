const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// STATUS CODE AS FEEDBACK
// ID as identifier not PHRASE
// separera olika funktioner till olika moduler
// fel hantering 




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// connect to local DB
// mongodb://localhost:27017/isPalindromeDB
mongoose.connect("mongodb+srv://Admin-Mouhammad:Test-123@cluster0.qfeva.mongodb.net/isPalindromeDB?retryWrites=true&w=majority", {
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


// one phrase that is Palindrome
const racecar = new Phrase({
  phrase: "racecar",
  isPalindrome: isPalindrome("racecar"),
});
// one phrase that is NOT Palindrome
const drop = new Phrase({
  phrase: "drop",
  isPalindrome: isPalindrome("drop"),
});

//  -----------------------Request targeting all words/phrases ---------------------------

app.route("/phrases")

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

//  -----------------------Request targetting a specific word/phrase ---------------------------
app.route("/phrases/:customPhrase")

  // GET a Specific phrase
  .get(function (req, res) {
    Phrase.findOne(
      { phrase: req.params.customPhrase },
      function (err, foundPhrase) {
        if (!err) {
          if (foundPhrase) {
            res.send(foundPhrase);
          } else {
            // res.send(foundPhrase);
            res.status(404).send("No match found");

            // res.send("No phrases matche that phrase you are trying to find");
          }
        } else {
          res.send(err);
        }
      }
    );
  })

  // Put a new message
  .put(function (req, res) {
    Phrase.replaceOne(
      { phrase: req.params.customPhrase },
      { phrase: req.body.phrase, isPalindrome: isPalindrome(req.body.phrase) },
      { overwrite: true },
      function (err, foundPhrase) {
        if (!err) {
          if (foundPhrase) {
            res.send("Phrase put/replaced successfully");
          } else {
            res.send("No phrases matche that phrase you are trying to find");
          }
        } else {
          res.send(err);
        }
      }
    );
  })

  // Patch a new message
  .patch(function (req, res) {
    Phrase.updateOne(
      { phrase: req.params.customPhrase },
      { $set: req.body },
      function (err, foundPhrase) {
        if (!err) {
          if (foundPhrase) {
            res.send("Phrase patched successfully");
          } else {
            res.send("No phrases matche that phrase you are trying to find");
          }
        } else {
          res.send(err);
        }
      }
    );
  })

  // Delete a specific messages
  .delete(function (req, res) {
    Phrase.deleteOne({ phrase: req.params.customPhrase }, function (err) {
      if (!err) {
        res.send("Phrase deleted successfully");
      } else {
        res.send(err);
      }
    });
  });


// Port will be chosen dynamically from the server provider or run on localhost port 3000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server has started successfully");
});


// Function to check if the string is Palindrome or not
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

// ------------------- Function Testing------------------------
// ------Palindrome
// console.log(isPalindrome("racecar"));
// console.log(isPalindrome("Don't nod."));
// console.log(isPalindrome("Eva, can I see bees in a cave?"));
// ------NOT Palindrome
// console.log(isPalindrome("raceccar"));
