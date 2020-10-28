const router = require('express')();
const controller = require('./controller');

router.get('/:id', controller.getCompany);

module.exports = router;