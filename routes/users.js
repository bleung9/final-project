var express = require('express');
var router = express.Router();

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
router.get('/userid/matches', function (req, res, next) {
  res.send('User matches here');
});

/*
To Do:
chat routes using talkJS
*/

module.exports = router;
