var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Add users view');
});

// User logged in profile
router.get('/:id/show', function (req, res, next) {
  res.send('User profile here');
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
