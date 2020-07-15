const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

//custom middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
    next();
}

server.use(express.json());
server.use(logger);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
