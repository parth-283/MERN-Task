const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const cors = require("cors");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const res = require("express/lib/response");
const EmailID = "kp2832002@gmail.com";
const EmailPassword = "9157764985";

const sendrestepasswordmail = async (name, email, token) => {
  console.log(`name : ${name} = Email : ${email} = Token : ${token}`);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: EmailID,
        pass: EmailPassword
      },
     
    });
    const mailOptions = {
      form: email,
      to: EmailID,
      subject: "For Reset Password",
      html:
        "<p>Hii" +
        name +
        ", please copy the link and <a href='htttp://localhost:5000/resetpass?token=" +
        token +
        "'> reset your password</a> </p>",
    };
    transporter.sendMail(mailOptions, function (errr, info) {
      if (errr) {
        console.log(errr);
      } else {
        console.log("Mail has been send:-", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, mag: error.message });
  }
};

// JWT Token
const jwt = require("jsonwebtoken");
const jwtkey = "jwt";


mongoose
  .connect(
    "mongodb+srv://Parth:YdUd1p59zGNPmcbi@test1.ippjdm7.mongodb.net/task?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected");
  });

app.use(cors());

app.get("/", function (req, res) {
  res.end("hello");
});

// Register Route
app.post("/register", jsonParser, function (req, res) {
  const Data = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  });
  console.log(Data);
  Data.save()
    .then((result) => {
      // res.status(201).json(result)
      jwt.sign({ result }, jwtkey, { expiresIn: "300s" }, (err, token) => {
        res.status(201).json({ token, result });
      });
    })
    .catch((err) => {
      console.warn(err, "ERROR");
    });
});

// Login Route
app.post("/login", jsonParser, function (req, res) {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data.password == req.body.password) {
      jwt.sign({ data }, jwtkey, { expiresIn: "300s" }, (err, token) => {
        res.status(200).json({ token });
      });
    }
  });
});

app.get("/user", verifyToken, function (req, res) {
  User.find().then((result) => {
    res.status(200).json(result);
    console.log(result);
  });
});

app.post("/forgetpass", jsonParser, async function (req, res) {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const RandomString = randomstring.generate();
      await User.updateOne(
        { email: email },
        { $set: { token: RandomString } }
      );
      sendrestepasswordmail(userData.name, userData.email, RandomString);
      res
        .status(200)
        .send({ success: true, msg: "Please Chek Your Inbox Of mail.." });
    } else {
      res.status(200).send({ success: true, msg: "This Email is Not exist.." });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

app.get("/resetpass", jsonParser, async function (req, res) {
  try {
    const token = req.query.token;
    const tokendata = await User.findOne({ token: token });
    if (tokendata) {
      const password = req.body.password;
      const UserData = await User.findByIdAndUpdate(
        { _id: tokendata._id },
        { $set: { password: password, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .send({
          success: true,
          msg: "Password has been reset",
          data: UserData,
        });
    } else {
      res
        .status(200)
        .send({ success: true, msg: "This link has been expierd..." });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// middleware
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    console.log(bearer[1]);
    req.token = bearer[1];
    jwt.verify(req.token, jwtkey, (err, authData) => {
      if (err) {
        res.json({ result: err });
      } else {
        next();
      }
    });
  } else {
    res.send({ Result: "Token Not Provided" });
  }
}

app.listen(5000);
