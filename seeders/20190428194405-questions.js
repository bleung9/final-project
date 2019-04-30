'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let to_insert = [ { question: "What is your MBTI personality?", 
                        answers: ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "Do you smoke (Y/N)", answers: ["y", "n"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "Do you mind pets? (Y/N)", answers: ["y", "n"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "Are you a night owl? (Y/N)", answers: ["y", "n"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "Do you mind living with someone of the opposite gender? (Y/N)", answers: ["y", "n"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "Do you prefer to have the house at a hot or cold temperature? (H/C)", answers: ["h", "c"], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "On a scale of 1-10, how important is it that your space is always kept clean?", answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "On a scale of 1-10, how much do you mind that your roommate frequently has frds/SO?", answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "On a scale of 1-10, how much do you like Pikachu?", answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], createdAt: new Date(), updatedAt: new Date() }, 
                      { question: "On a scale of 1-10, how much did you like Avengers: Endgame?", answers: ["y", "n"], createdAt: new Date(), updatedAt: new Date() } ];
    return queryInterface.bulkInsert('Questions', to_insert, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
