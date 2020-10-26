const { Notices } = require('../models');

async function isStored(noticeId) {
  const isStored = await Notices.count({
    where: { id: noticeId }
  });
  return isStored ? true : false;
}

module.exports = isStored;