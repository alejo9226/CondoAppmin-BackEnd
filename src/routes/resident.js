const router = require('express').Router()
const residentController = require('../controllers/resident.controller')
const { auth } = require('../utils/auth')

router.route('/').post(residentController.create)
router.route('/signin').post(residentController.signin)
router.route('/list').get(residentController.list)
router.route('/').get(auth, residentController.show)
router.route('/getEmail').put(auth, residentController.foundEmail)
router.route("/").delete(auth, residentController.deleteAll)
module.exports = router

