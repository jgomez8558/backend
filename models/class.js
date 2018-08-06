'use strict';
module.exports = (sequelize, DataTypes) => {
  var classes = sequelize.define('class', {
    ClassId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    Category: DataTypes.STRING,
    Class: DataTypes.STRING,
    Location: DataTypes.STRING,
    Image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  classes.associate = function(models) {
    // associations can be defined here
  };
  return classes;
};