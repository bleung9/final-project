const Sequelize = require('sequelize');

// Option 1: Passing parameters separately

module.exports = function startDB() {
  const sequelize = new Sequelize('midterm', 'labber', 'labber', {
    host: 'localhost',
    dialect: 'postgres'
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};