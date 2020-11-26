const router = require("express").Router();
const ticketController = require("../controllers/ticket.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth ,ticketController.create);
router.route("/").get(auth, ticketController.list);
router.route("/").put(auth, ticketController.update);

module.exports = router;
