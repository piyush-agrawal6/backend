const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

const { userRouter } = require("./routes/Users.route");
const { postRouter } = require("./routes/Posts.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page");
});
app.use("/api", userRouter);
app.use("/posts", postRouter);

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
