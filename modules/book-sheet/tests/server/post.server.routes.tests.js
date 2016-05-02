'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Post = mongoose.model('Post'),
  express = require(path.resolve('./config/lib/express'));

//global variable
var app, agent, credentials,credentials2, user,user2, post;

//posts routes tests
describe('Post CRUD test', function () {
  before(function (done) {
    app = express.init(mongoose);
    agent = request.agent(app);
    done();
  });

  beforeEach(function (done) {
    credentials = {
      username: 'james zhang',
      password: 'ZXcv_123456'
    };

    credentials2 = {
      username: 'james zhang2',
      password: 'ZXcv_1234562'
    };

    user = new User({
      firstName: 'James',
      lastName: 'Zhang',
      displayName: 'James Zhang',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    user2 = new User({
      firstName: 'James2',
      lastName: 'Zhang2',
      displayName: 'James Zhang2',
      email: 'test2@test.com',
      username: credentials2.username,
      password: credentials2.password,
      provider: 'local'
    });

    user.save(function () {
      user2.save(function () {
        post = {
          title: 'Sample Post',
          text: 'Hello World'
        };
        done();
      });
    });
  });

  //Http POST  to the /api/posts
  it('should be able to save an post if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signInErr, signInRes) {
        if (signInErr) {
          return done(signInErr);
        }

        var userId = user.id;

        agent.post('/api/posts')
          .send(post)
          .expect(200)
          .end(function (postSaveErr, postSaveRes) {
            if (postSaveErr) {
              return done(postSaveErr);
            }
            Post.find().exec(function (err, posts) {
              if (err) {
                return done(err);
              }
              (posts[0].author.toString()).should.equal(userId);
              (posts[0].title).should.match('Sample Post');
              done();
            });

            /*agent.get('/api/posts')
             .end(function (postsGetErr, postsGetRes) {
             if (postsGetErr) {
             return done(postsGetErr);
             }

             var posts = postsGetRes.body;

             (posts[0].user._id).should.equal(userId);
             (posts[0].title).should.match('Sample Post');

             done();
             });
             });*/
          });
      });
  });

  it('should no able to create a post if not signed in ', function (done) {
    agent.post('/api/posts')
      .expect(403)
      .end(function (postSaveErr, postSaveRes) {
        if(postSaveErr){
          return done(postSaveErr);
        }
        done();
      });
  });


  //Http GET /api/posts
  it('should be able to get a list of posts if logged in', function (done) {
    var postObj = new Post(post);
    postObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signInErr, signInRes) {
          if (signInErr) {
            return done(signInErr);
          }

          agent.get('/api/posts')
            .expect(200)
            .end(function (postGetErr, postGetRes) {
              if (postGetErr) {
                return done(postGetErr);
              }
              postGetRes.body.should.be.instanceof(Array).and.have.lengthOf(1);

              done();
            });
        });

    });
  });
  //Http GET /api/posts/:postID

  //Http UPDATE /api/posts/:postID
  it('should be able to update a post if logged in', function (done) {
    var postObj = new Post(post);
    postObj.author = user;
    postObj.title = 'Sample update title';
    postObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signInErr, signInRes) {
          if(signInErr){
            return done(signInErr);
          }

          agent.put('/api/posts/' + postObj._id)
            .expect(200)
            .end(function (postDeleteErr, postDeleteRes) {
              if(postDeleteErr){
                return done(postDeleteErr);
              }
              (postDeleteRes.body._id).should.equal(postObj._id.toString());

              done();
            });
        });
    });
  });

  //Http DELETE /api/posts/:postID
  it('should be able to delete a post if logged in', function (done) {
    var postObj = new Post(post);
    postObj.author = user;
    postObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signInErr, signInRes) {
          if(signInErr){
            return done(signInErr);
          }

          agent.delete('/api/posts/' + postObj._id)
            .expect(200)
            .end(function (postDeleteErr, postDeleteRes) {
              if(postDeleteErr){
                return done(postDeleteErr);
              }

              (postDeleteRes.body._id).should.equal(postObj._id.toString());

              done();
            });
        });
    });
  });

  it('should not be able to delete if logged if not logged in', function (done) {
    var postObj = new Post(post);
    postObj.author = user;
    postObj.save(function () {
      agent.delete('/api/posts/' + postObj._id)
        .expect(403)
        .end(function (postDeleteErr, postDeleteRes) {
          if(postDeleteErr) {
            return done(postDeleteErr);
          }
          done();
        });
    });
  });


  it('should not be able to delete if logged in as author user', function (done) {
    var postObj = new Post(post);
    postObj.author = user;
    postObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials2)
        .expect(200)
        .end(function (singInErr, signInRes) {
          if (singInErr) {
            return done(singInErr);
          }

          agent.delete('/api/posts/' + postObj._id)
            .expect(403)
            .end(function (postDeleteErr, postDeleteRes) {
              if (postDeleteErr) {
                return done(postDeleteErr);
              }
              done();
            });
        });

    });
  });

  //Http PUT /api/posts/:postID


  afterEach(function (done) {
    User.remove().exec(function () {
      Post.remove().exec(done);
    });
  });

});

