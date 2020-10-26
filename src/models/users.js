const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull:false,
  },
  password: {
    type: DataTypes.STRING(25),
    allowNull:false,
  }
}, {
  sequelize,
  tableName: 'users'
});

module.exports = Users;
