const express = require("express");
const router = express.Router();
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");
const postRouter = require("../posts/postRouter.js");

router.use("/:id/posts", postRouter);

router.post("/", validateUser, (req, res) => {
  const body = req.body;
  userDb.insert(body).then(user => {
    res.status(201).json(user);
  });
});

router.get("/", (req, res) => {
  userDb.get().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.getById(id).then(user => {
    res.json(user);
  });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  userDb.getUserPosts(id).then(posts => {
    res.status(200).json(posts);
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.remove(id).then(user => {
    res.send("deleted");
  });
});

router.put("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.update(id, body).then(user => {
    res.status(200).json(body);
  });
});

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb.getById(id).then(post => {
    console.log(post);
    if (!post) {
      res.status(400).json({ message: "invalid user id" });
    } else {
      req.user = post;
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "A user requires a name field" });
  } else {
    next();
  }
}

module.exports = router;
