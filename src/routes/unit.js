const router = require("express").Router();
const unitController = require("../controllers/unit.controller");

router.route("/").post(unitController.create);
router.route("/").get(unitController.list);

module.exports = router;
