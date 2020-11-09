const router = require('express')();
const controller = require('./controller');
const { authVerify, isAdmin, checkAdmin } = require('../../middlewares/auth');

router.get('/', authVerify, checkAdmin, controller.getInterviewList);
router.post('/', authVerify, isAdmin, controller.registerInterview);
router.put('/:id', authVerify, isAdmin, controller.updateInterview);
router.delete('/:id', authVerify, isAdmin, controller.deleteInterview);

module.exports = router;
