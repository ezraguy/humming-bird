const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateposts } = require('../models/user');
const { Post } = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();

const getPosts = async postsArr => {
  const posts = await Post.find({ _id: { $in: postsArr } }).populate('user_id', "name");
  return posts;
};

router.get('/my-favorites', auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  const fav = user.posts;
  const myFav = await getPosts(fav);
  res.send(myFav);

});

router.post('/:id', auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  let post_id = req.params.id;
  user.posts.push(post_id);
  await user.save();
  res.send('Post has been saved to favorites')
});



router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  user = new User(_.pick(req.body, ['name', 'email', 'password', 'posts']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router; 