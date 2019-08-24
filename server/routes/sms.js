const router = require('express').Router();
const controllers = require('../controllers/sms');
const { validateId } = require('../middleware/validation');

router.get('/', controllers.getAllSmsOrByContact());
router.get('/:id', validateId, controllers.getSmsById());
router.post('/', controllers.createSms());
router.delete('/:id', validateId, controllers.deleteSms());

module.exports = router;
