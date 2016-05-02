'use strict';


var posts = require('../controllers/booksheet.server.controller.js'),
  postsAccessPolicy = require('../policies/posts.server.policy');
module.exports = function(app) {
  // Routing logic   
  app.route('/api/posts').all(postsAccessPolicy.isAllowed)
    .get(posts.list)
    .post(posts.create);

  app.route('/api/posts/:postId').all(postsAccessPolicy.isAllowed)
    .delete(posts.delete)
    .put(posts.update);

  app.param('postId', posts.postByID);

};
