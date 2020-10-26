const Interviews = require('./interviews');
const { Notices } = require('./notice');
const FileMappings = require('./fileMappings');

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

module.exports = {
  Interviews,
  Notices,
  FileMappings
};