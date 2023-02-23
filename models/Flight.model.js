const mongoose = require("mongoose");

const flightSchema = mongoose.Schema(
  {
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
  },
  {
    versionKey: false,
  }
);

const Flight = mongoose.model("flight", flightSchema);

module.exports = { Flight };
