const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

const MAX_TITLE_LEN = 40;
const MAX_CONTENT_LEN = 2000;

class Notices extends Model {}

Notices.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(MAX_TITLE_LEN),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(MAX_CONTENT_LEN),
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

module.exports = {
  Notices,
  MAX_TITLE_LEN,
  MAX_CONTENT_LEN
};