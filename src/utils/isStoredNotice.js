const Notice = require('../models/notice');
const { badRequest } = require('../errors');

async function isStoredNotice(id) {
  if (typeof id !== 'number') {
    throw badRequest;
  }
  const isStored = await Notice.count({
    where: { id: id }
  });

  return !!isStored;
}

module.exports = isStoredNotice;