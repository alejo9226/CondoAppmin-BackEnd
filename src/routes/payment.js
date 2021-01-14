const router = require("express").Router()
const paymentController = require("../controllers/payment.controller")
const { auth } = require("../utils/auth")

router.use(auth)
router.route("/").post(paymentController.create)

module.exports = router