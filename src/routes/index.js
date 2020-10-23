const router = require('express')();
const notice = require('./notice');
const interview = require('./interview');

router.use('/notice', notice);
router.use('/interview', interview);

module.exports = router;