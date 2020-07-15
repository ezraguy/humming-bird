const express = require('express');
const _ = require('lodash');
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();


router.get("/my-posts", auth, async (req, res) => {
  if (!req.user) return res.status(401).send("Access Denied");
  const posts = await Post.find({ user_id: req.user._id });
  res.send(posts);
});

router.get("/", auth, async (req, res) => {
  const posts = await Post.find()
  res.send(posts)
})


router.delete('/:id', auth, async (req, res) => {
  const card = await Card.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  res.send(card);

});

router.put('/:id', auth, async (req, res) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!card) return res.status(404).send('The card with the given ID was not found.');

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);

});

router.get('/:id', auth, async (req, res) => {

  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  res.send(card);

});

router.post('/', auth, async (req, res) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post(
    {
      title: req.body.title,
      tags: req.body.tags,
      imgUrl: req.body.imgUrl,
      user_id: req.user._id
    }
  );

  post = await post.save();
  res.send(post);

});



module.exports = router; 