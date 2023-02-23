const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number,
});

const Flight = mongoose.model("post", flightSchema);

module.exports = { Flight };
