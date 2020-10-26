const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class Employment extends Model {}

Employment.init({
  id: {
    type: DataTypes.INTEGER,
    //allowNull:false,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    //allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  sequelize,
  tableName: 'employments'
});

module.exports = Employment;
