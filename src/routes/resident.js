const router = require("express").Router();
const residentController = require("../controllers/resident.controller");

router.route("/").post(residentController.create);
router.route("/").get(residentController.list);

module.exports = router;
