const router = require('express').Router()
const subTicketController = require('../controllers/subTicket.controller')
const { auth } = require('../utils/auth')

router.route('/').post(auth, subTicketController.create)
router.route('/').put(auth, subTicketController.list)

module.exports = router
