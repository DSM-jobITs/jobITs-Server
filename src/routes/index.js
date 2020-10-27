const router = require('express')();
const employment = require('./employment');
const login = require('./login');
const ping = require('./ping');
const notice = require('./notice');
const interview = require('./interview');

router.use('/employment', employment);
router.use('/login', login);
router.use('/ping', ping); //test
router.use('/notice', notice);
router.use('/interview', interview);

module.exports = router;
