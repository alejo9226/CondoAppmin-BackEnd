const router = require('express').Router()
const residentController = require('../controllers/resident.controller')
const { auth } = require('../utils/auth')

router.route('/').post(residentController.create)
router.route('/signin').post(residentController.signin)
router.route('/').get(auth, residentController.list)
router.route('/').get(auth, residentController.foundEmail)
module.exports = router

