const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class Companys extends Model {}

Companys.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  introduction: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING(2)
  }
}, {
  sequelize,
  tableName: 'companys'
});

module.exports = Companys;