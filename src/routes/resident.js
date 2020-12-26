const router = require('express').Router()
const residentController = require('../controllers/resident.controller')
const { auth } = require('../utils/auth')

router.use(auth)

router.route('/').post(residentController.create)
router.route('/signin').post(residentController.signin)

router.route('/list').get(residentController.list)
router.route('/:condoid').get(residentController.show)
router.route('/single/:residentid').get(residentController.showOne)

router.route('/getEmail').put(residentController.foundEmail)

router.route("/").delete(residentController.deleteAll)
router.route("/:residentid").delete(residentController.deleteOne)

module.exports = router

