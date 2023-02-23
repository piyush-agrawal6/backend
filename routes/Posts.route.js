const express = require("express");
const { PostModel } = require("../models/Post.model");
const { postvalidator } = require("../middlewares/postvalidator.middleware");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  let query = req.query;
  try {
    const posts = await PostModel.find(query);
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong" });
  }
});

postRouter.post("/create", postvalidator, async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.status(200).send("Created the post");
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong" });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const post = await PostModel.findOne({ _id: id });
  const postID_in_post = post.postID;
  const postId_making_req = req.body.postID;
  try {
    if (postId_making_req !== postID_in_post) {
      res.send({ msg: "You are not authorized" });
    } else {
      const post = await PostModel.findByIdAndUpdate({ _id: id }, payload);
      if (!post) {
        res.status(404).send(`Post with id ${id} not found`);
      }
      res.status(200).send(`Post with id ${id} updated`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const post = await PostModel.findOne({ _id: id });
  const postID_in_post = post.postID;
  const postId_making_req = req.body.postID;
  try {
    if (postId_making_req !== postID_in_post) {
      res.send({ msg: "You are not authorized" });
    } else {
      const post = await PostModel.findByIdAndDelete({ _id: id });
      if (!post) {
        res.status(404).send(`Post with id ${id} not found`);
      }
      res.status(200).send(`Post with id ${id} deleted`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = { postRouter };
