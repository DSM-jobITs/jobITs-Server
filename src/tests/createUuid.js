const makeUuid = require('../utils/makeUuid');
require('date-utils');

// console.log(makeUuid('(주)하얀마인드'));

// const checkExp = /^\s*$/;
// console.log(checkExp.test(' a d'));

const date = new Date().toFormat('YYYY-MM-DD');
console.log(date);