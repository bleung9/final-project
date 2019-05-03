'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    cur_user_id: DataTypes.INTEGER,
    matched_user_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Matches.associate = function(models) {
    // associations can be defined here
  };
  return Matches;
};