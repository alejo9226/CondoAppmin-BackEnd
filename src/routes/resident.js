const router = require('express').Router()
const residentController = require('../controllers/resident.controller')
const { auth } = require('../utils/auth')

router.route('/').post(auth, residentController.create)
router.route('/signin').post(residentController.signin)

router.route('/getResident').get(auth, residentController.authenticate)
router.route('/list').get(auth, residentController.list)
router.route('/:condoid').get(auth, residentController.show)
router.route('/single/:residentid').get(auth, residentController.showOne)

router.route('/getEmail').put(auth, residentController.foundEmail)
router.route("/:residentid").put(auth, residentController.update)

router.route("/").delete(auth, residentController.deleteAll)
router.route("/:residentid").delete(auth, residentController.deleteOne)

module.exports = router