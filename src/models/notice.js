const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class Notices extends Model {}

Notices.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  fixed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'notices'
});

module.exports = Notices;