const Notices = require('../models/notice');

async function countOfSameNotice(createdAt) {
  try {
    return await Notices.count({
      where: { createdAt: createdAt }
    });
  } catch (error) {
    error.status = 500;
    throw error;
  }
}

module.exports = countOfSameNotice;