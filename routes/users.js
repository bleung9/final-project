var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Add users view');
});

// User logged in profile
router.get('/:id/create', function (req, res, next) {
  res.render('questionnaire');
});

// User matches
router.get('/:id/matches', function (req, res, next) {
  let templateVars = {email: req.cookies.email};
  res.render('match', templateVars);
});

/*
To Do:
chat routes using talkJS
*/

module.exports = router;
