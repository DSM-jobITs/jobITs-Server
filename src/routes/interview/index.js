const router = require('express')();
const controller = require('./controller');

router.get('/', controller.getInterviewList);
router.post('/', controller.registerInterview);
router.put('/:id', controller.updateInterview);
router.delete('/:id', controller.deleteInterview);

module.exports = router;