const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Booking = mongoose.model("book", bookSchema);

module.exports = { Booking };
