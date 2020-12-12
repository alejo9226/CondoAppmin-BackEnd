const router = require("express").Router();
const unitController = require("../controllers/unit.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route("/").post(unitController.create);
router.route("/").get(unitController.list);
router.route("/:condoid").get(unitController.show);
router.route("/").delete(unitController.deleteAll);

module.exports = router;
