const router = require("express").Router;
const {
  createPost,
  getAllPosts,
  deletePost,
  getSinglePost,
  updatePost,
} = require("./posts.controller");
const {authRequired} = require("../middlewares/authRequired");

const postsRouter = router();

postsRouter.route("/").all(authRequired).get(getAllPosts).post(createPost);
postsRouter
  .route("/:postId")
  .all(authRequired)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = { postsRouter };
