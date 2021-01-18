const router = require("express").Router()
const paymentController = require("../controllers/payment.controller")
const { auth } = require("../utils/auth")

router.use(auth)
router.route("/").post(paymentController.create)

router.route("/condo/:condoid").get(paymentController.showCondoPayments)
router.route("/single/:usertype/:paymentid").get(paymentController.showSinglePayment)
router.route("/many/:usertype/:residentid?").get(paymentController.showResidentPayments)

router.route("/:paymentid").put(paymentController.isPayed)

module.exports = router