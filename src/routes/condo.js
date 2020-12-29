const router = require("express").Router();
const condoController = require("../controllers/condo.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route("/").post(condoController.create);
router.route("/list").get(condoController.list);
router.route("/").get(condoController.show)
router.route("/:condoid").put(condoController.update)
router.route("/").delete(condoController.deleteAll);
router.route("/:condoid").delete(condoController.delete);

module.exports = router;
