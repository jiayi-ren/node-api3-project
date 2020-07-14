const express = require('express');

const router = express.Router();

const User = require('./userDb')
const Post = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const user = req.body
  User.insert(user)
    .then(user =>{
      res.status(200).json({message: `New User ${user.id} created`})
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })

});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // do your magic!
  const post = req.body
  Post.insert(post)
    .then(post =>{
      res.status(200).json({message: `Post ${post.id} created`})
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users =>{
      res.status(200).json(users)
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  User.getById(id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  User.getUserPosts(id)
    .then(posts =>{
      res.status(200).json(posts)
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  User.remove(id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params
  const user = req.body
  User.update(id, user)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: `Internal Error: ${err}`})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id)
    .then(user =>{
      if (user) {
        req.user = user;
        next()
      }else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body
  if (!user){
    res.status(400).json({ message: "missing user data" })
  }
  if (!user.name){
    res.status(400).json({ message: "missing required name field" })
  }
  next()
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body
  if (!post){
    res.status(400).json({ message: "missing post data" })
  }
  if (!post.text){
    res.status(400).json({ message: "missing required text field" })
  }
  next()
}

module.exports = router;
