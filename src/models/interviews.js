const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');
require('date-utils');

class Interviews extends Model {}

Interviews.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: new Date().toFormat('YYYY-MM-DD')
  },
  field: {
    type: DataTypes.STRING(14),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'interviews'
});

module.exports = Interviews;