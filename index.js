const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const postsRouter = require("./modules/post/posts.route");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to my server. use /posts to get all posts") 
});

app.use("/posts", postsRouter);

async function start() {
    await dbConnect();
    
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

start();

