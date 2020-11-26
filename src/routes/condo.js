const router = require("express").Router();
const condoController = require("../controllers/condo.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth ,condoController.create);
router.route("/").get(auth, condoController.list);

module.exports = router;
