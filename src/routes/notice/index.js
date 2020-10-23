const router = require('express')();
const controller = require('./controller');

router.get('/', controller.getNoticeList);
router.get('/:id', controller.getNotice);
router.post('/', controller.registerNotice);
router.put('/:id', controller.updateNotice);
router.delete('/:id', controller.removeNotice);

module.exports = router;