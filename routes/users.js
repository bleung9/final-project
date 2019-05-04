var express = require("express");
var router = express.Router();
var models = require("../models");
var helpers = require("../helpers.js");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Add users view");
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
  currentResponse.sort(function(a, b) {
    if (a.dataValues.question_id > b.dataValues.question_id) {
      return 1;
    } else {
      return -1;
    }
  });
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

  currentResponse.sort(function(a, b) {
    if (a.dataValues.question_id > b.dataValues.question_id) {
      return 1;
    } else {
      return -1;
    }
  });

  res.render('summary', {
    title: 'Final Project',
    email: req.cookies.email,
    user: currentUser,
    response: currentResponse,
    id: req.cookies.id,
    email: req.cookies.email
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
router.get("/:id/create", function(req, res, next) {
  let tempVars = { id: req.params.id,
                  email: req.params.email};
  console.log("req", req.params.id);
  res.render("questionnaire", tempVars);
});

router.post("/:id/create", function(req, res, next) {
  let rb = req.body;
  let response = [rb.personality, rb.smoke, rb.pets, rb.night, rb.oppositeGender, rb.temperature, rb.cleanliness, rb.petScore, rb.avenger, rb.pika, rb.neighbourhood.substring(0, rb.neighbourhood.indexOf('(') - 1), rb.bio];
  const question_answer = [];
  for (i = 0; i < 12; i++) {
    question_answer.push({
      user_id: req.params.id,
      question_id: i + 1,
      answer: response[i]
    });
  }
  models.Responses.bulkCreate(question_answer).then(() => {
    let id = req.params.id;
    res.redirect(`/users/${id}/matches`);
  });
});

//edit profile
router.get('/:id/update', async function (req, res, next) {
  let user_info = await models.User.findOne({
    where: {
      id: req.params.id
    }
  })
  let tempVars = {
    user: user_info,
    id: req.cookies.id
  }
  res.render('profile', tempVars);
});

// User matches
router.get("/:id/matches", async function(req, res, next) {
  console.log(req.params.id);
  const answers_from_db = await models.Responses.findAll({
    where: {
      user_id: req.params.id
    }
  });
  // console.log("matches screen", answers_from_db);
  let user_answers = [];
  console.log("db", answers_from_db);
  console.log("db[0]", answers_from_db[0].dataValues.question_id);
  answers_from_db.sort(function(a, b) {
    if (a.dataValues.question_id > b.dataValues.question_id) {
      return 1;
    } else {
      return -1;
    }
  });
  answers_from_db.forEach(answer => user_answers.push(answer.answer));
  console.log("user_answers", user_answers);
  let user_id = Number(req.params.id);
  models.Responses.findAll().then(async function(data) {
    let rankings = {};
    let user_neigh;
    let user_bio;
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
      } else if (question_id >= 7 && question_id <= 10) {
        rank_change += helpers.distance(user_answers[question_id - 1], data[i].answer);
      } else if (question_id === 11) {
        user_neigh = user_answers[question_id - 1];
      } else if (question_id === 12) {
        user_bio = user_answers[question_id - 1];
      }
      if (!rankings[other_user]) {
        rankings[other_user] = 0;
        rankings[other_user] += rank_change;
      } else {
        rankings[other_user] += rank_change;
      }
    }
    let keys = Object.keys(rankings);
    let to_sort_same_n = [];
    let to_sort_diff_n = [];
    let promises = [];
    for (let i = 0; i < keys.length; i++) {
      promises.push(models.User.findOne({ where: { id: keys[i] } }));
    }
    let users = await Promise.all(promises);
    let count = 1;
    for (let i = 0; i < users.length; i++) {
      if (rankings[users[i].id] < 1000 && user_id !== users[i].id) {
        const neigh_info = await models.Responses.findOne({
          where: {
            user_id: users[i].id,
            question_id: 11
          }
        });
        console.log("user_neigh", user_neigh)
        let random_url = helpers.url_gen();
        let cur_user_obj = await models.Matches.findOrCreate({
          where: {
            cur_user_id: req.params.id,
            matched_user_id: neigh_info.user_id
          }, 
          defaults: {
            url: random_url
          }});
        let matched_user_obj = await models.Matches.findOrCreate({
          where: {
            cur_user_id: neigh_info.user_id,
            matched_user_id: req.params.id
          }, 
          defaults: {
              url: random_url
          }});
        let url_insert = cur_user_obj[0].get({ plain: true });
        if (neigh_info.answer === user_neigh && rankings[users[i].id] < 18.3) {
          to_sort_same_n.push({ user: users[i].dataValues, neigh: neigh_info.answer, url: url_insert.url, rank: rankings[users[i].id] });
        } else if (rankings[users[i].id] < 18.3) {
          to_sort_diff_n.push({ user: users[i].dataValues, neigh: neigh_info.answer, url: url_insert.url, rank: rankings[users[i].id] });
        }
      }
    }
    to_sort_same_n.sort(helpers.sorting);
    console.log("same", to_sort_same_n);
    to_sort_diff_n.sort(helpers.sorting);
    res.render("match", {
      user_same: to_sort_same_n,
      user_diff: to_sort_diff_n,
      email: req.cookies.email,
      id: req.cookies.id, 
      neigh: user_neigh
    });
  });
});

// Route for matched chat.
router.get("/:id/matches/:hash", async function(req, res, next) {
  console.log("req", req.params.id);
  let other_user = await models.Matches.findOne({
    where: {
      url: req.params.hash
    }
  })
  let other_user_id = other_user.matched_user_id;
  other_user = await models.User.findOne({
    where: {
      id: other_user_id
    }
  });
  let otherResponse = await models.Responses.findAll({
    where: {
      user_id: other_user_id
    }
  })
  let templateVars = {
    me_id: req.params.id,
    me_name: req.cookies.firstName,
    me_email: req.cookies.email,
    email: req.cookies.email,
    other_id: other_user.id,
    other_name: other_user.firstName,
    other_email: other_user.email,
    other_response: otherResponse
  }
  res.render("matchchat", templateVars);
});

router.get('/:id/inbox', function(req, res, next) {
  res.render('inbox', {
    me_id: req.params.id,
    me_name: req.cookies.firstName,
    me_email: req.cookies.email,
    email: req.cookies.email,
  });
});


module.exports = router;
