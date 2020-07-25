const express = require('express');
const _ = require('lodash');
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth');
const { result } = require('lodash');
const router = express.Router();
const { User } = require('../models/user');

router.get("/my-posts", auth, async (req, res) => {
  if (!req.user) return res.status(401).send("Access Denied");
  const posts = await Post.find({ user_id: req.user._id }).populate('user_id', "name");
  res.send(posts);
});

// router.get("/my-favorites", auth, async (req, res) => {
//   const posts = await Post.find({ user_id: req.user._id }).populate('user_id', "name");
//   res.send(posts)
// })


router.get("/", auth, async (req, res) => {
  const posts = await Post.find().populate('user_id', "name");
  res.send(posts)
})


router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
  if (!post) return res.status(404).send('The post with the given ID was not found.');
  res.send(post);

});




router.put('/:id', auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!post) return res.status(404).send('The post with the given ID was not found.');

  post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(post);

});

router.get('/:id', auth, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!post) return res.status(404).send('The card with the given ID was not found.');
  res.send(post);

});

router.post('/', auth, async (req, res) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post(
    {
      title: req.body.title,
      tags: req.body.tags,
      img64: req.body.img64,
      user_id: req.user._id
    }
  );

  post = await post.save();
  res.send(post);

});



module.exports = router; 