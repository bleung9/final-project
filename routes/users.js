var express = require('express');
var router = express.Router();
var models = require('../models');
var helpers = require('../helpers.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Add users view');
});

// User logged in profile
router.get('/:id/create', function (req, res, next) {
  let tempVars = { id: req.params.id }
  console.log("req", req.params.id)
  res.render('questionnaire', tempVars);
});

router.post('/:id/create', function (req, res, next) {
  let rb = req.body;
  console.log(rb);
  let response = [rb.personality, rb.smoke, rb.pets, rb.night, rb.oppositeGender, rb.temperature, rb.cleanliness, rb.petScore, rb.avenger, rb.pika, rb.neighbourhood.substring(0, rb.neighbourhood.indexOf('(') - 1)];
  const question_answer = [];
  for (i = 0; i < 11; i++) {
    question_answer.push(
      {
        user_id: req.params.id,
        question_id: i + 1,
        answer: response[i]
      }
    );
  }
  console.log("create_form", question_answer);
  models.Responses.bulkCreate(question_answer).then(() => {
    let id = req.params.id
    res.redirect(`/users/${id}/matches`);
  })
});

// User matches
router.get('/:id/matches', async function (req, res, next) {
  console.log("User id", req.params.id);
  const answers_from_db = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  });
  // console.log("matches screen", answers_from_db);
  let user_answers = [];
  answers_from_db.forEach(answer => user_answers.push(answer.answer));
  // console.log(user_answers);
  let user_id = req.params.id;
  models.Responses.findAll().then(async function(data) {
    let rankings = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].user_id === user_id) {
        continue;
      }
      let other_user = data[i].user_id;
      let question_id = data[i].question_id;
      let rank_change = 0;
      if (question_id === 1) {
        rank_change += helpers.personality_check(user_answers[question_id - 1], data[i].answer);
      } else if (question_id >= 2 && question_id <= 6) { 
        rank_change += helpers.binaryOption(user_answers[question_id - 1], data[i].answer);
      } else if (question_id <= 10) {
        rank_change += helpers.distance(user_answers[question_id - 1], data[i].answer);
      }
      if (!rankings[other_user]) {
        rankings[other_user] = 0;
        rankings[other_user] += rank_change;
      } else {
        rankings[other_user] += rank_change;
      }
    }
    let keys = Object.keys(rankings);
    console.log("rankings obj", rankings)
    let to_sort = [];
    let promises = [];
    for (let i = 0; i < keys.length; i++) {
      promises.push(models.User.findOne({ where: { id: keys[i] } }))
    }
    let users = await Promise.all(promises);
    users.forEach(function(user) {
      if (rankings[user.id] < 1000) {
        to_sort.push({ "user": user.dataValues, rank: rankings[user.id] });
      }
    });
    to_sort.sort(helpers.sorting);
    res.render('match', { 
      user: to_sort, 
      email: req.cookies.email, 
      id: req.cookies.id,
      firstName: req.cookies.firstName
    });

    // console.log("User is", user[0])
    // res.render('match', {
    //   nameother: user[0].dataValues.lastName,
    //   emailother: user[0].dataValues.email,
    //   nameme: user[1].dataValues.lastName,
    //   emailme: user[1].dataValues.email,
    //   email: req.cookies.email

    });
  });

  router.get('/:id/url_hash', function (req, res, next) {
    res.render('matchprofile', {
      email: req.cookies.email, 
      id: req.cookies.id,
      firstName: req.cookies.firstName
    });
  });

module.exports = router;
