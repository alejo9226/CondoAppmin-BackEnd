const router = require('express').Router()
const subTicketController = require('../controllers/subTicket.controller')
const { auth } = require('../utils/auth')

router.route('/').post(auth, subTicketController.create)
router.route('/').put(auth, subTicketController.list)
// router.route('/').get(auth, ticketController.list)
// router.route('/:adminid').get(auth, ticketController.show)

// router.route('/updateState').put(auth, ticketController.updateState)

module.exports = router
