const router = require('express')();
const controller = require('./controller');
const { authVerify } = require('../../middlewares/auth');

router.get('/:id', authVerify, controller.getCompany);

module.exports = router;