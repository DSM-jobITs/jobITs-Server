const router = require('express')();
const controller = require('./controller');

router.get('/',controller.getCompanyList);
router.get('/:id', controller.getCompany);

module.exports = router;
