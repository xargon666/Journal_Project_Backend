const express = require("express");
const cors = require("cors");
const Post = require("./data");
const {
  addComment,
  findPostById,
  addPost,
  readDataFromFile,
  deletePost,
  addEmoji,
  updatePost,
  dataUrl,
} = require("./utils.js");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Journal Enrties Page!");
});

app.get("/posts", (req, res) => {
  const allPosts = readDataFromFile(dataUrl);
  res.send(allPosts);
});

app.get("/posts/:id", (req, res) => {
  try {
    const post = String(req.params.id);
    const retrievedPost = findPostById(post, dataUrl);
    res.send(retrievedPost);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post("/posts", (req, res) => {
  const newPost = req.body;

  if (newPost.title.length <= 0 || newPost.title.length > 50) {
    res
      .status(405)
      .send({ error: "Title length should be between 1 and 50 characters" });
  } else if (newPost.body.length <= 0 || newPost.body.length > 500) {
    res
      .status(405)
      .send({ error: "Body length should be between 1 and 500 characters" });
  } else {
    const updatedData = addPost(newPost);
    res.status(201).send(updatedData);
  }
});

app.delete("/posts", (req, res) => {
  try {
    const postToBeDeleted = req.body;
    const filteredData = deletePost(postToBeDeleted);

    res.status(200).send(filteredData);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

app.post("/posts/comments", (req, res) => {
  try {
    const post = req.body.post;
    const comment = req.body.comment;
    const retrievedPostAndComments = addComment(post, comment, dataUrl);

    res.status(201).send(retrievedPostAndComments);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

app.post("/posts/emojis", (req, res) => {
  try {
    const post = req.body.post;
    const clickedEmoji = req.body.emoji;

    if (clickedEmoji < 0 || clickedEmoji > 2) {
      res
        .status(405)
        .send({ error: "that reaction has not been implemented." });
    } else {
      const newData = addEmoji(post, clickedEmoji, dataUrl);
      res.status(201).send(newData);
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

app.patch("/posts", (req, res) => {
  const post = req.body.post;
  const newData = req.body.newData;

  try {
    if (!post || !newData) {
      res
        .status(405)
        .send({ error: "Both the original post and the new data are needed." });
    } else if (
      (newData.title && newData.title.length > 50) ||
      (newData.body && newData.body.length > 300)
    ) {
      res.status(405).send({
        error:
          "Title cannot be longer than 50 characters and body cannot be longer than 300 characters",
      });
    } else {
      const updatedPostArray = updatePost(post, newData, dataUrl);

      res.send(updatedPostArray);
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

module.exports = app;
