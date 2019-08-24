const router = require('express').Router();

const controllers = require('../controllers/contacts');
const { validateId } = require('../middleware/validation');

router.get('/', controllers.getAllContacts());
router.get('/:id', validateId, controllers.getOneContact());
router.post('/', controllers.createContact());
router.put('/:id', validateId, controllers.updateContact());
router.delete('/:id', validateId, controllers.deleteContact());

module.exports = router;
