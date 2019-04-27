var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Final Project' });
});

// Register page
router.get('/register', function(req, res, next) {
  res.send("Add register view");
});

// Login page
router.get('/login', function(req, res, next) {
  res.send("Add login view");
});

// Login
router.post('/login', function(req, res, next) {
  // need to implement this
})

module.exports = router;
