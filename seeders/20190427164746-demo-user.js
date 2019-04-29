'use strict';

var Chance = require('chance');
var chance = new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    to_insert = [];
    for (i = 0; i < 10; i++) {
      let name = chance.name();
      let firstName = name.split(" ")[0];
      let lastName = name.split(" ")[1];
      let email = chance.email();
      let password = "abc123";
      let createdAt = updatedAt = new Date();
      let obj = { firstName, lastName, email, password, createdAt, updatedAt };
      to_insert.push(obj);
    }

    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Cena',
        email: 'demo@demo.com',
        password: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date() 
      },{
        firstName: 'John',
        lastName: 'Nash',
        email: 'demo2@demo.com',
        password: 'abc124',
        createdAt: new Date(),
        updatedAt: new Date() 
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};