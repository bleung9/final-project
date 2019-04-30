var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Add users view');
});

// User logged in profile
router.get('/:id/create', function (req, res, next) {
  let tempVars = {id: req.params.id}
  console.log("req",req.params.id)
  res.render('questionnaire', tempVars);
});

router.post('/:id/create', function (req, res, next) {
  res.render('/');
});

// User matches
router.get('/:id/matches', function (req, res, next) {
  models.User.findAll({
    // return all users
  }).then(user => {
    // console.log("User is", user[0])
    res.render('match', { 
          nameother: user[0].dataValues.lastName,
          emailother: user[0].dataValues.email,
          nameme: user[1].dataValues.lastName,
          emailme: user[1].dataValues.email,
          email: req.cookies.email
         });
  });
});

/*
To Do:
chat routes using talkJS
*/

module.exports = router;
