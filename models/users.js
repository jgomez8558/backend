const bcrypt = require("bcryptjs");

'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    UserId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Address: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Phone: DataTypes.INTEGER,
    Role: DataTypes.INTEGER,
    Username: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };

  users.prototype.comparePassword = function (plainTextPassword) {
    let user = this;
    return bcrypt.compareSync(plainTextPassword, user.Password)
  };
  
  return users;
};