// import express - server lib
const express = require("express");
const path = require("path");

// import cors to set CORS options to '*' easily
const cors = require("cors");
const dbOperations = require("./dbOperations");
const mailer = require("./mailer");

const SPECIAL_LETTERS = `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?`;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateName = (str) => {
  return String(str)
    .toLowerCase()
    .match(/^[A-Za-z]+$/);
};

const validatePassword = (password) => {
  var res = true;

  if (password.length < 8) res = false;

  var upperCaseLetters = /[A-Z]/g;
  var lowerCaseLetters = /[a-z]/g;
  if (!password.match(upperCaseLetters) && !password.match(lowerCaseLetters))
    res = false;

  var numLetters = /[0-9]/g;
  if (!password.match(numLetters)) res = false;

  return res;
};

const port = process.env.PORT || 5000;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../build")));

// parse all requests as json
app.use(express.json());
// set cors to '*'
app.use(cors());
app.use(express.static(__dirname)); //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]

app.options("*", cors());

//DB Connection
app.post("/api/registration", async (req, res) => {
  try {
    if (!validateName(req.body.firstName)) {
      res
        .status(504)
        .json({ status: 504, message: "Only latin letters are valid" });
    } else if (!validateName(req.body.lastName)) {
      res
        .status(504)
        .json({ status: 504, message: "Only latin letters are valid" });
    } else if (!validateEmail(req.body.email)) {
      res.status(504).json({ status: 504, message: "Invalid Email" });
    } else if (!validatePassword(req.body.password)) {
      res.status(504).json({
        status: 504,
        message:
          "Password must contain minimum eight characters, at least one letter and one number",
      });
    } else {
      const rowsAffected = await dbOperations.addUserToDB(req.body);
      await mailer.sendWelcomeEmail(
        req.body.email,
        req.body.firstName,
        req.body.lastName
      );
      res.status(200).json({ status: 200, message: rowsAffected });
    }
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      res.status(504).json({ status: 504, message: "Invalid Email" });
    } else if (!validatePassword(req.body.password)) {
      res.status(504).json({
        status: 504,
        message:
          "Password must contain minimum eight characters, at least one letter and one number",
      });
    } else {
      const user = await dbOperations.getUserFromDB(req.body);
      res.status(200).json({ status: 200, message: user });
    }
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
  res.json();
});

app.post("/api/forgotPassword", async (req, res) => {
  try {
    const userEmail = req.body.email;
    if (!validateEmail(userEmail)) {
      res.status(504).json({ status: 504, message: "Invalid Email" });
    } else {
      const user = await dbOperations.validateUserExist(userEmail);
      if (user.length > 0) {
        let newPass = "weak";
        while (!validatePassword(newPass)) {
          let randLetter = Math.floor(Math.random() * SPECIAL_LETTERS.length);
          let randPos = Math.floor(Math.random() * newPass.length);

          newPass = Math.random().toString(36).slice(-10);
          newPass =
            newPass.slice(0, randPos) +
            SPECIAL_LETTERS.charAt(randLetter) +
            newPass.slice(randPos);
        }

        const rowsAffected = await dbOperations.updateUserPassword(
          userEmail,
          newPass
        );
        console.log(newPass);
        mailer.sendNewPasswordByEmail(userEmail, newPass);
        res.status(200).json({ status: 200, message: rowsAffected });
      } else {
        res.status(404).json({ status: 503, message: "User not found" });
      }
    }
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
  res.json();
});

app.post("/api/services", async (req, res) => {
  try {
    const services = await dbOperations.getAllServicesByEmail(req.body.email);
    res.status(200).json({ status: 200, message: services });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/services/add", async (req, res) => {
  try {
    const rowsAffected = await dbOperations.addServiceToDB(
      req.body.service,
      req.body.email
    );
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/services/update", async (req, res) => {
  try {
    const rowsAffected = await dbOperations.updateExistingService(req.body);
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/services/delete", async (req, res) => {
  try {
    console.log(req.body);
    const rowsAffected = await dbOperations.deleteServiceByNumber(
      req.body.treatmentNumber
    );
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname, "../build", "index.html"));
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  try {
    await dbOperations.connectToDB();
  } catch (error) {
    console.log(`Error: Can not connect to database`);
  }
});
