//this is a list of queries/operations that we will have to perform on our database

const Sequelize = require('sequelize');
const models  = require('./models');


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
    .then(() => {
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
      // let answers =  ["ISTJ", "y", "n", "y", "n", "h", 3, 1, 10, 7];
      // for (let i = 0; i < 10; i++) {
      //   let question_id = i + 1;
      //   let answer = String(answers[i]); 
      //   models.Responses.create({ user_id, question_id, answer}).then(res => console.log("insert successful!"));
      // }

      // user tries to access his ranking list
      // let answers =  ["ISTJ", "y", "n", "y", "n", "h", 3, 1, 10, 7];
      models.Responses.findAll().then(function(data) {
        
      })



    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
};

startDB();








