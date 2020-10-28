const Interviews = require('./interviews');
const { Notices } = require('./notices');
const FileMappings = require('./fileMappings');
const Users = require('./users'); //여기부터 dupang이 씀
const Employment = require('./employment');
const Companys = require('./companys');
const EmployeRecord = require('./employeRecord');

Notices.hasMany(FileMappings, {
  foreignKey: 'noticeId',
  sourceKey: 'id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

FileMappings.belongsTo(Notices, {
  foreignKey: 'noticeId',
  targetKey: 'id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Companys.hasMany(EmployeRecord, {
  foreignKey: 'company_id',
  sourceKey: 'id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

EmployeRecord.belongsTo(Companys, {
  foreignKey: 'company_id',
  targetKey: 'id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

module.exports = {
  Interviews,
  Notices,
  FileMappings,
  Users,
  Employment,
  Companys,
  EmployeRecord
};
