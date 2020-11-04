const router = require('express')();
const controller = require('./controller');
const { authVerify } = require('../../middlewares/auth');

router.get('/',authVerify, controller.getCompanyList);
router.get('/:id', authVerify, controller.getCompany);

module.exports = router;
