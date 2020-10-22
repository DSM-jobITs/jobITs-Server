const router = require('express')();
const interview = require('./interview');

router.use('/interview', interview);

module.exports = router;