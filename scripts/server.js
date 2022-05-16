const express = require("express");
const cors = require("cors");
const Post = require("./data");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Journal Enrties Page!");
});

app.get("/posts", (req, res) => {
  res.send(Post);
});

app.get("/posts/:id", (req, res) => {
  try {
    const postsId = parseInt(req.params.id);
    const post = Post[postsId - 1];

    if (!post) {
      throw new Error("this post does not exist");
    } else {
      res.send(
        post
        // (id = post.id),
        // (body = post.body),
        // (link = post.link),
        // (date = post.date),
        // (postRef = post.postRef)
      );
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post("/posts", (req, res) => {
  const newPost = req.body;

  const foundPostIndex = Post.findIndex(
    (Post) => Post.postRef.toLocaleLowerCase() === newPost.postRef.toLowerCase()
  );

  try {
    if (foundPostIndex !== -1) {
      throw new Error("this post exists");
    } else {
      Post.push(newPost);
      res.status(201).send(newPost);
    }
  } catch (err) {
    res.status(405).send({ error: err.message });
  }
});

app.delete("/students/:name", (req, res) => {
  try {
    const newPost = req.body;

    const foundPostIndex = Post.findIndex(
      (Post) =>
        Post.postRef.toLocaleLowerCase() === newPost.postRef.toLowerCase()
    );
    console.log("delete - found Post", foundPostIndex);

    if (foundPostIndex === -1) {
      throw new Error("this post does not exist");
    } else {
      Post.splice(foundPostIndex, 1);
      let message = `${postRef} has been deleted.`;
      console.log(message);
      res.status(200).send({ message });
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});
// aap.get  / tick
// app.get   /posts tick
// app.get  / posts/:id
// app.post   /posts
// app.delete  /posts/:id

module.exports = app;
