const router = require("express").Router();
const residentController = require("../controllers/resident.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth, residentController.create);
router.route("/").get(auth, residentController.list);

module.exports = router;
