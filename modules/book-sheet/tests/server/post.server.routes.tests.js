'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    express = require(path.resolve('./config/lib/epxress'));

//global variable
var app, agent, credentials, user, post;

//posts routes tests
describe('Post CRUD test', function () {
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);
        done();
    });

    beforeEach(function(done){
        credentials = {
            username :'MEANJSUser',
            password : 's@mplePassword'
        };

        user = new User({
            firstName :'MEAN',
            lastName : 'JS',
            displayName : 'MEANJS',
            email:'meanjs@test.com',
            username : credentials.username,
            password : credentials.password,
            provider : 'local'
        });

        user.save(function () {
            post = {
                title:'Sample Post',
                text:'Hello World'
            };

            done();

        });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Post.remove().exec(done);
        })
    });

});

