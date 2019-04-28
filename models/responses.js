'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define('Responses', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    answers: DataTypes.STRING
  }, {});
  Responses.associate = function(models) {
    // associations can be defined here
  };
  return Responses;
};