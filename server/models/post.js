const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const postShcema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  tags: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },


  imgUrl: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postShcema);

function validatePost(post) {

  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    tags: Joi.string().min(2).max(1024).required(),
    imgUrl: Joi.string().min(11).max(1024)
  });

  return schema.validate(post);
}



exports.Post = Post;
exports.validatePost = validatePost;
