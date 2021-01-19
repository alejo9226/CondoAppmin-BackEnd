const router = require("express").Router()
const serviceController = require("../controllers/service.controller")
const { auth } = require("../utils/auth")

router.use(auth)
router.route('/').post(serviceController.create)

module.exports = router