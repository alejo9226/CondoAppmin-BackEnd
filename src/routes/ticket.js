const router = require("express").Router()
const ticketController = require("../controllers/ticket.controller")
const { auth } = require('../utils/auth')

router.route("/").post(auth, ticketController.create);
router.route("/").get(ticketController.list);
router.route("/:adminid").get(auth, ticketController.show);
router.route("/").put(auth, ticketController.update);
router.route("/").delete(auth, ticketController.deleteAll);

module.exports = router;
