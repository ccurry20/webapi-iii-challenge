// code away!
const express = require("express");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());

function logger(req, res, next) {
  console.log([new Date().toISOString()], ` ${req.method}, ${req.url}`);
  next();
}

server.use(logger);
server.use("/posts", postRouter);
server.use("/users", userRouter);

server.use("/", (req, res) => res.send("API up and running!"));

server.listen(5000, () => console.log("API running on port 5000"));
