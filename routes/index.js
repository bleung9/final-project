var express = require('express');
var models = require('../models');



var router = express.Router();
// const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Final Project' });
});

// Register page
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Final Project' });
});

router.post('/register', function(req, res) {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    personality: req.body.personality,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    passwordHash: req.body.password
  }
  // store new user in database
  //retrieve that new user's id
  models.User.create(newUser).then(()=> {
    models.User.findOne({
      where: {email: newUser.email},
    }).then(user => {
      let userId = user.get('id')
      console.log('this is the userId',userId)
      res.redirect(`/users/${userId}/create`);
    })
  })
})

// Login page
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Login
router.post('/login', function(req, res, next) {
  // query database, loop through users see if email is equal in loop AND password equal in loop is true)
  // if true then set req.session.userid = results of loop[i].id
  //redirect
  // else return 403, user or password incorrect.
  models.User.findAll({
    // return all users
  }).then(results => {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].dataValues.email)
      if (req.body.email === results[i].dataValues.email && req.body.password === results[i].dataValues.password) {
        console.log("Match found");
        res.cookie('userid', req.body.email);
        res.redirect('/');
        break;
      }
    }
  })
  //   return res.status(403).send('Email and/or password is incorrect').end();
  // });
});

// Questionnaire, will only be accessible if user logged in! /:id/profile/create
router.get('/questionnaire', function(req, res, next) {
  res.send('questionnaire view');
});

// Test chat page, this will be hidden behind a user eventually
router.get('/chat', function(req, res, next) {
  models.User.findAll({
    // return all users
  }).then(user => {
    // console.log("User is", user[0])
    res.render('chat', { 
          nameother: user[0].dataValues.lastName,
          emailother: user[0].dataValues.email,
          nameme: user[1].dataValues.lastName,
          emailme: user[1].dataValues.email
         });
  });
});



module.exports = router;
