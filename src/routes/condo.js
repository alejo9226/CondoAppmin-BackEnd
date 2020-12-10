const router = require("express").Router();
const condoController = require("../controllers/condo.controller");

router.route("/").post(condoController.create);
router.route("/").get(condoController.list);
router.route("/").delete(condoController.deleteAll);

module.exports = router;
