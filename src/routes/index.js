const router = require('express')();
const notice = require('./notice');

router.use('/notice', notice);

module.exports = router;