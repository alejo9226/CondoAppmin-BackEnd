const router = require("express").Router();
const unitController = require("../controllers/unit.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route("/").post(unitController.create);
router.route("/list").get(unitController.list);
router.route("/:condoid").get(unitController.show);
router.route("/:unitid").put(unitController.update)
router.route("/:unitid").delete(unitController.delete);
router.route("/").delete(unitController.deleteAll);

module.exports = router;
