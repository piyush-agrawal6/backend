const express = require("express");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  registervalidator,
} = require("../middlewares/registervalidator.middleware");
const { loginvalidator } = require("../middlewares/loginvalidator.middleware");

const userRouter = express.Router();

userRouter.post("/register", registervalidator, async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: secure_password,
        });
        await user.save();
      }
    });
  } catch (error) {
    console.log("Some Error occurred, unable to Register.");
    console.log(error);
  }
  res.status(200).send("Registration Successful");
});

userRouter.post("/login", loginvalidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key, {
            expiresIn: "1h",
          });
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(400).send("Wrong credentials, please try again.");
        }
      });
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Login.");
    console.log(error);
  }
});

module.exports = { userRouter };
