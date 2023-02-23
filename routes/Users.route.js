require("dotenv").config();
const { UserModel } = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

const { loginValidate } = require("../middlewares/loginValidator");
const { registerValidate } = require("../middlewares/registerValidator");

//user register
userRouter.post("/register", registerValidate, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, safe_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: safe_pass,
        });
        await user.save();
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.status(201).send("Registration Successful");
});

//user login
userRouter.post("/login", loginValidate, async (req, res) => {
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
          res.status(201).send({ message: "Login Successful", token: token });
        } else {
          res.status(400).send("Wrong credentials");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { userRouter };
