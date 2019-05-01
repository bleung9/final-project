//this is a list of queries/operations that we will have to perform on our database

const Sequelize = require('sequelize');
const models  = require('./models');

function distance(user, db) {
  return Math.abs(Number(user) - Number(db));
}

function binaryOption(user, db) {
  return user !== db ? 5 : 0;
}

function sorting(a, b) {
  if (a.rank < b.rank) {
    return -1;
  } else if (a.rank > b.rank) {
    return 1;
  } else {
    return 0;
  }
}

function personality_check(user, db) {
  let compatibility_list = { "ESFP": ["ESFJ", "ESTP", "ISFP"], 
                            "ESTP": ["ESTJ", "ESFP", "INFJ"], 
                            "ESTJ": ["ESTP", "ESFJ", "ISTJ"], 
                            "ESFJ": ["ISTP", "ESTJ", "ESTP"], 
                            "ISTJ": ["INFJ", "ISTP", "ISFJ"], 
                            "ISTP": ["ISFP", "INFP", "ESFP"], 
                            "ISFJ": ["ESFJ", "ISFP", "ISTJ"], 
                            "ISFP": ["ESFP", "ISFJ", "ESFJ"], 
                            "ENTJ": ["INTJ", "ENTP", "ENFJ"], 
                            "ENTP": ["ENTJ", "ENFP", "ENFJ"], 
                            "ENFJ": ["ENFJ", "INFJ", "ENFP"], 
                            "ENFP": ["ENTJ", "INTJ", "INTP"], 
                            "INTJ": ["INTP", "INFJ", "INFP"], 
                            "INTP": ["ENTP", "INFP", "ENFP"], 
                            "INFJ": ["ISTJ", "INFP", "INTJ"], 
                            "INFP": ["INFJ", "ISFJ", "ENFJ"]
                          }
  return compatibility_list[user].includes(db) ? 0 : 1000;
}

function startDB() {
  // const sequelize = new Sequelize("final_project", "labber", "labber", {
  //   // host: "localhost",
  //   dialect: "postgres"
  // });
  const sequelize = new Sequelize({
    database: 'final_project',
    username: 'labber',
    password: "labber",
    dialect: 'postgres'
  });
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connection has been established successfully.");
      
      // CORE FUNCTIONALITIES:
      // user loads profile create page, get questions from database
      // let questions;
      // models.Question.findAll().then(function(data) {
      //   questions = data;
      //   console.log(questions);
      // });

      // user submits his answers, save to db
        // let user_id = 1;
        // let new_answer = "n";
        // let answers =  ["ISTJ", "y", "n", "y", "n", "h", 3, 1, 10, 7];
        // for (let i = 0; i < 10; i++) {
        //   let question_id = i + 1;
        //   let answer = String(answers[i]); 
        //   models.Responses.create({ user_id, question_id, answer}).then(res => console.log("insert successful!"));
        // }

      // user updates his answers, save to db
      // let user_id = 4;
      // let new_answer = "n"; // in the routes, you have to update 10 rows in the db (one for each Q, regardless of whether or not that answer was changed from before)
      // let answers =  ["ISTJ", "y", "n", "y", "n", "h", 3, 1, 10, 7];
      // let numberOfAffectedRows = await models.Responses.destroy({ 
      //   where: { user_id: user_id }
      // });
      // console.log("done");
      // after getting rid of all those rows, re-run the save to db function
      

      // user tries to access his ranking list
      let logged_in_user = 1 // this will actually be user_id based on email cookies in Users table
      models.Responses
      let user_answers =  ["ISTJ", "y", "y", "y", "n", "h", 3, 1, 10, 7];
      models.Responses.findAll().then(async function(data) {
        let rankings = {};
        for (let i = 0; i < data.length; i++) {
          let other_user = data[i].user_id;
          let question_id = data[i].question_id;
          let rank_change = 0;
          if (question_id === 1) {
            rank_change += personality_check(user_answers[question_id - 1], data[i].answer);
          } else if (question_id >= 2 && question_id <= 6) { 
            rank_change += binaryOption(user_answers[question_id - 1], data[i].answer);
          } else if (question_id <= 10) {
            rank_change += distance(user_answers[question_id - 1], data[i].answer);
          }
          if (!rankings[other_user]) {
            rankings[other_user] = 0;
            rankings[other_user] += rank_change;
          } else {
            rankings[other_user] += rank_change;
          }
        }
        let keys = Object.keys(rankings);
        let to_sort = [];
        let promises = [];
        for (let i = 0; i < keys.length; i++) {
          promises.push(models.User.findOne({ where: { id: keys[i] } }))
        }
        let users = await Promise.all(promises);
        users.forEach(user => to_sort.push({ user, rank: rankings[user.id] }));
        console.log("sorted", to_sort[0]);
      });

    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
};

startDB();








