'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Book sheet
 */
exports.create = function (req, res) {
  var post = new Post(req.body);
  post.author = req.user;

  post.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * Show the current Book sheet
 */
exports.read = function (req, res) {

};

/**
 * Update a Book sheet
 */
exports.update = function (req, res) {

};

/**
 * Delete an Book sheet
 */
exports.delete = function (req, res) {
  var post = req.post;
  post.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * List of Book sheets
 */
exports.list = function (req, res) {
  Post.find().populate('author', 'displayName').exec(function (err, posts) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

/*
* Post Middleware
*/
exports.postByID = function (req, res, next, id) {
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Post ID is invalid'
    });
  }

  Post.findById(id).populate('author', 'displayName').exec(function (err, posts) {
    if (err) {
      return next(err);
    }else if(!posts){
      return res.status(400).send({
        message: 'No post with that identifier has been found'
      });
    }
    req.post = posts;
    next();

  });
};
