'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rankings = sequelize.define('Rankings', {
    user_id: DataTypes.INTEGER,
    other_user_id: DataTypes.INTEGER,
    agg_rank: DataTypes.INTEGER
  }, {});
  Rankings.associate = function(models) {
    // associations can be defined here
  };
  return Rankings;
};