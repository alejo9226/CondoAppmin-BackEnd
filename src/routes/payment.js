const router = require("express").Router()
const paymentController = require("../controllers/payment.controller")
const { auth } = require("../utils/auth")

router.use(auth)
router.route("/").post(paymentController.create)
router.route("/:residentid").get(paymentController.showResidentPayments)
router.route("/condo/:condoid").get(paymentController.showCondoPayments)

module.exports = router