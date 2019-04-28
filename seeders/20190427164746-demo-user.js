'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
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