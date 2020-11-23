const router = require("express").Router();
const ticketController = require("../controllers/ticket.controller");

router.route("/").post(ticketController.create);
router.route("/").get(ticketController.list);
router.route("/").get(ticketController.update);

module.exports = router;
