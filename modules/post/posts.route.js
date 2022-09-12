const router = require("express").Router;
const { createPost, getAllPosts } = require("./posts.controller");

const postsRouter = router();

postsRouter.route("/").get(getAllPosts).post(createPost);

module.exports = postsRouter;
