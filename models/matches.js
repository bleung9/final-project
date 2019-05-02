'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    first_user: DataTypes.STRING,
    matched_user: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Matches.associate = function(models) {
    // associations can be defined here
  };
  return Matches;
};