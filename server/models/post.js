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


  img64: {
    type: String,
    required: true,
    minlength: 11,

  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postShcema);

function validatePost(post) {

  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    tags: Joi.string().min(2).max(1024).required(),
    img64: Joi.string().min(11).required()
  });

  return schema.validate(post);
}



exports.Post = Post;
exports.validatePost = validatePost;
