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
  const updatedData = addPost(newPost);

  try {
    if (!newPost) {
      throw new Error("Invalid data");
    } else {
      res.status(201).send(updatedData);
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
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

    if (!retrievedPostAndComments) {
      throw new Error("could not add the comment as post wasnt found");
    }
    res.status(201).send(retrievedPostAndComments);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

app.post("/posts/emojis", (req, res) => {
  try {
    const post = req.body.post;
    const clickedEmoji = req.body.emoji;

    if (!post || !clickedEmoji) {
      throw new Error("Invalid data");
    } else {
      const newData = addEmoji(post, clickedEmoji, dataUrl);
      res.status(201).send(newData);
    }
  } catch (err) {
    res.status(405).send({ error: err.message });
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
      (newData.body && newData.body.length > 200)
    ) {
      res.status(405).send({
        error:
          "Title cannot be longer than 50 characters and body cannot be longer than 200 characters",
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
