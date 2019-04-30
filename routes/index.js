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
  res.send("Add login view");
});

// Login
router.post('/login', function(req, res, next) {
  // need to implement this
})

// Questionnaire, will only be accessible if user logged in! /:id/profile/create
router.get('/questionnaire', function(req, res, next) {
  res.send('questionnaire view');
});

module.exports = router;
