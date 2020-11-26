const router = require("express").Router();
const unitController = require("../controllers/unit.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth ,unitController.create);
router.route("/").get(auth, unitController.list);
router.route("/:condoId").get(auth, unitController.show);

module.exports = router;
