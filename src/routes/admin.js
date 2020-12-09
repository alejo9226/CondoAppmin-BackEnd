const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const { auth } = require('../utils/auth')

router.route('/signup').post(adminController.create)
router.route('/signin').post(adminController.signin)
router.route('/').get(auth, adminController.show)
router.route('/list').get(adminController.list)
router.route('/getEmail').put(auth, adminController.foundEmail)

module.exports = router
