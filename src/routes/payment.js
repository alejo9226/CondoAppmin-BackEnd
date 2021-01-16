const router = require("express").Router()
const paymentController = require("../controllers/payment.controller")
const { auth } = require("../utils/auth")

router.use(auth)
router.route("/").post(paymentController.create)
router.route("/condo/:condoid").get(paymentController.showCondoPayments)
router.route("/:usertype/:residentid").get(paymentController.showResidentPayments)

module.exports = router