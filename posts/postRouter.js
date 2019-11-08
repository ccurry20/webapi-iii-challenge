const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("./postDb.js");

router.post("/", validatePost, (req, res) => {
  const userId = req.params.id;
  console.log(req.params.id);
  req.body = userId;

  db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/:postId", (req, res) => {
  const id = req.params.postId;
  db.getById(id).then(post => {
    res.status(200).json(post);
  });
});

router.delete("/:postId", (req, res) => {
  const id = req.params.postId;
  db.remove(id).then(resonse => {
    res.send("deleted");
  });
});

router.put("/:postId", (req, res) => {
  const postId = req.params.postId;
  const body = req.body;
  db.update(postId, body).then(post => {
    res.status(201).json(body);
  });
});

// custom middleware

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
