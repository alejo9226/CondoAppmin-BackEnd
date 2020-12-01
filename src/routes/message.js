const router = require("express").Router()
const messageController = require("../controllers/message.controller")
const { auth } = require('../utils/auth')

router.route("/").post(auth, messageController.create);
router.route("/").get(auth, messageController.list);
router.route("/:residentid").get(auth, messageController.show);
router.route("/").put(auth, messageController.update);

module.exports = router;
