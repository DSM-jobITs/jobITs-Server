const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./connection');

class EmployeRecord extends Model {}

EmployeRecord.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING(4),
    allowNull: false
  },
  num_of_employed: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'employe_record'
});

module.exports = EmployeRecord;