const router = require('express')();
const controller = require('./controller');
const { authVerify, isAdmin } = require('../../middlewares/auth');

router.get('/', controller.getNoticeList);
router.get('/:id', controller.getNotice);
router.post('/', authVerify, isAdmin, controller.registerNotice);
router.put('/:id', authVerify, isAdmin, controller.updateNotice);
router.delete('/:id', authVerify, isAdmin, controller.removeNotice);

module.exports = router;
