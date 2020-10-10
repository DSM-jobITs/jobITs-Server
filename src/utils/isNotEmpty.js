const Notice = require('../models/notice');

async function isNotEmpty() {
  return !!await Notice.count();
}

module.exports = isNotEmpty;