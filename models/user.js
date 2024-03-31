const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true, 
    primaryKey: true  // unique + index
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  }
}, {

});

module.exports = User;