// 1 What is your MBTI personality? 
// 2 Do you smoke (Y/N)
// 3 Do you mind pets? (Y/N)
// 4 Are you a night owl? (Y/N)
// 5 Do you mind living with someone of the opposite gender? (Y/N)
// 6 Do you prefer to have the house at a hot or cold temperature? (H/C)
// 7 On a scale of 1-10, how important is it that your space is always kept clean?
// 8 On a scale of 1-10, how much do you mind that your roommate frequently has frds/SO?
// 9 On a scale of 1-10, how much do you like Pikachu?
// 10 On a scale of 1-10, how much did you like Avengers: Endgame?

'use strict';

var Chance = require('chance');
var chance = new Chance();

function insert(user_id, question_id, answer) {
  return { user_id, question_id, answer, createdAt: new Date(), updatedAt: new Date()}
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    // let answers = ["INTJ", "y", "y", "y", "y", "h", 10, 10, 10, 10]
    let personalities = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", 
                        "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
    let yes_or_no = ["y", "n"];
    let hot_or_cold = ["h", "c"];
    let to_insert = [];

    // 10 random seed users
    for (let i = 0; i < 10; i++) {
      let user_id = i + 1;
      // 10 questions per user to generate random answers for
      for (let j = 1; j <= 10; j++) {
        let question_id = j;
        if (question_id === 1) {
          let personality = personalities[Math.floor(Math.random() * 16)];
          to_insert.push(insert(user_id, question_id, personality));
        } else if (question_id >= 2 && question_id <= 5) {
          let yn = yes_or_no[Math.floor(Math.random() * 2)];
          to_insert.push(insert(user_id, question_id, yn));
        } else if (question_id === 6) {
          let hc = hot_or_cold[Math.floor(Math.random() * 2)];
          to_insert.push(insert(user_id, question_id, hc));
        } else if (question_id >= 7 && question_id <= 10) {
          let rating = Math.floor(Math.random() * 10) + 1;
          to_insert.push(insert(user_id, question_id, rating));
        }
      }
    }
    return queryInterface.bulkInsert('Responses', to_insert, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Responses', null, {});
  }
};
