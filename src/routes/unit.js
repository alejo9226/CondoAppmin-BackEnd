const router = require("express").Router();
const unitController = require("../controllers/unit.controller");

router.route("/").post(unitController.create);
router.route("/").get(unitController.list);
router.route("/:condoid").get(unitController.show);

module.exports = router;
