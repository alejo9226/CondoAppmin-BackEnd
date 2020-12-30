const router = require('express').Router()
const ticketController = require('../controllers/ticket.controller')
const { auth } = require('../utils/auth')

router.route("/").post(auth, ticketController.create);

router.route("/").get(ticketController.list);
router.route("/resident/:residentemail").get(auth, ticketController.showResidentTickets)
router.route("/:adminid/:condoid").get(auth, ticketController.showAdminTicketsByCondo);

router.route("/").put(auth, ticketController.update);
router.route('/updateState').put(auth, ticketController.updateState)
router.route('/selected').put(auth, ticketController.selected)
router.route('/updateTicket').put(auth, ticketController.updateReadFalse)

router.route("/").delete(auth, ticketController.deleteAll);

module.exports = router
