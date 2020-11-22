const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.route('/').post(adminController.create)
router.route('/').get(adminController.list)

module.exports = router
