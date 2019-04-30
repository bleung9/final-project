'use strict';

var Chance = require('chance');
var chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let to_insert = [];
    for (let i = 0; i < 10; i++) {
      let name = chance.name();
      let firstName = name.split(" ")[0];
      let lastName = name.split(" ")[1];
      let email = chance.email();
      let password = "abc123";
      let createdAt = new Date();
      let updatedAt = new Date();
      let obj = { firstName, lastName, email, password, createdAt, updatedAt };
      to_insert.push(obj);
    }
    return queryInterface.bulkInsert('Users', to_insert, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};