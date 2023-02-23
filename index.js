//imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//connection
const { connection } = require("./configs/db");

//route imports
const { userRouter } = require("./routes/Users.route");
const { flightRouter } = require("./routes/Flight.route");
const { Book } = require("./routes/Book.route");

//api
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Home page");
});
app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", Book);

//listening server
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
    console.log(error);
  }
  console.log(`Listening at port ${process.env.port}`);
});
