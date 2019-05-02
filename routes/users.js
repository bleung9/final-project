var express = require('express');
var router = express.Router();
var models = require('../models');
var helpers = require('../helpers.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Add users view');
});

router.get('/:id/questionnaire', async function (req, res, next) {
  let currentResponse = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  })
  res.render('update', {
    response: currentResponse,
    id: req.params.id
  });
});

//updating user responses
router.post('/:id/questionnaire', async function (req, res, next) {
  let currentResponse = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  })
  let currentUser = await models.User.findOne({
    where: {
      id: req.params.id
    }
  })
  console.log(req.params.id)
  for (item of currentResponse) {
    console.log(item.question_id)
  }
  let rb = req.body;
  console.log("n", rb.neighbourhood);
  let response = [rb.personality, rb.smoke, rb.pets, rb.night, rb.oppositeGender, rb.temperature, rb.cleanliness, rb.petScore, rb.avenger, rb.pika, rb.neighbourhood.substring(0, rb.neighbourhood.indexOf('(') - 1)];
  const new_answers = [];

  for (i = 0; i < 11; i++) {
    new_answers.push(currentResponse[i].update( {
      answer: response[currentResponse[i].question_id - 1]
    }));
  }
  let updates = await Promise.all(new_answers);
  
  res.render('summary', {
    title: 'Final Project',
    email: req.cookies.email,
    id: req.params.id,
    user: currentUser,
    response: currentResponse
  });
});


router.get('/:id', async function (req, res, next) {
  let currentUser = await models.User.findOne({
    where: {
      id: req.params.id
    }
  })
  console.log('user', currentUser)
  let currentResponse = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  })
  console.log('his response', currentResponse)

  res.render('summary', {
    title: 'Final Project',
    user: currentUser,
    response: currentResponse
  });
});

//update user information
router.post('/:id', async function (req, res, next) {
  let currentUser = await models.User.findOne({
    where: {
      id: req.body.id
    }
  })
  let currentResponse = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  })
  currentUser.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password
  })
    .then(function () {
      res.render('summary', {
        title: 'Final Project',
        email: req.cookies.email,
        id: req.cookies.id,
        user: currentUser,
        response: currentResponse
      });
    })
});

// User logged in profile
router.get('/:id/create', function (req, res, next) {
  let tempVars = { id: req.params.id }
  console.log("req", req.params.id)
  res.render('questionnaire', tempVars);
});

router.post('/:id/create', function (req, res, next) {
  let rb = req.body;
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
  models.Responses.bulkCreate(question_answer).then(() => {
    let id = req.params.id
    res.redirect(`/users/${id}/matches`);
  })
});

//edit profile
router.get('/:id/update', async function (req, res, next) {
  let user_info = await models.User.findOne({
    where: {
      id: req.params.id
    }
  })
  let tempVars = {
    user: user_info
  }
  res.render('profile', tempVars);
});


// User matches
router.get('/:id/matches', async function (req, res, next) {
  console.log(req.params.id);
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
  models.Responses.findAll().then(async function (data) {
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
    users.forEach(function (user) {
      if (rankings[user.id] < 1000) {
        to_sort.push({ "user": user.dataValues, rank: rankings[user.id] });
      }
    });
    to_sort.sort(helpers.sorting);
    res.render('match', { user: to_sort, email: req.cookies.email, id: req.cookies.id });

    // console.log("User is", user[0])
    // res.render('match', {
    //   nameother: user[0].dataValues.lastName,
    //   emailother: user[0].dataValues.email,
    //   nameme: user[1].dataValues.lastName,
    //   emailme: user[1].dataValues.email,
    //   email: req.cookies.email

  });
});


/*
To Do:
chat routes using talkJS
*/

module.exports = router;
