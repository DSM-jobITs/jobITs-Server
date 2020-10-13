const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class FileMappings extends Model {}

FileMappings.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  filename: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  uuid: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  noticeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'filemappings'
});

module.exports = FileMappings;