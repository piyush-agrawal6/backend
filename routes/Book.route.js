const express = require("express");
const { Booking } = require("../models/Booking.model");

const Book = express.Router();

Book.post("/booking", async (req, res) => {
  const payload = req.body;
  try {
    const book = new Booking(payload);
    await book.save();
    res.status(200).send("Created the booking");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

Book.get("/dashboard", async (req, res) => {
  try {
    const book = await Booking.find().populate(["user" , "flight"]);
    res.status(200).send({ Dashboard: book });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

module.exports = { Book };
