var express = require('express');
var models = require('../models');

var router = express.Router();
// const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Final Project',
    email: null 
  });
});

// Register page
router.get('/register', function(req, res, next) {
  res.render('register', { 
    title: 'Final Project',
    email: null 
  });
});

router.post('/register', function(req, res) {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    personality: req.body.personality,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password
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


// Login
router.post('/login', function(req, res, next) {
  models.User.findAll({
    // return all users
  }).then(results => {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].dataValues)
      if (req.body.email === results[i].dataValues.email && req.body.password === results[i].dataValues.password) {
        console.log("Match found");
        res.cookie('email', req.body.email);
        res.cookie('firstName', results[i].firstName);
        res.redirect('/users/:id/matches');
        break;
      } else {
        res.status(403).send('Email and/or password is incorrect').end();
      }
    }; 
  });
});

// Logout
router.post('/logout', function(req, res, next) {
  res.clearCookie('email');
  res.clearCookie('firstName');
  res.redirect('/');
})

// Questionnaire, will only be accessible if user logged in! /:id/profile/create
router.get('/questionnaire', function(req, res, next) {
  res.send('questionnaire view', { 
    title: 'Final Project',
    email: null 
  });
});

module.exports = router;
