const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.route('/signup').post(adminController.create)
router.route('/signin').post(adminController.signin)
router.route('/').get(adminController.list)

module.exports = router
