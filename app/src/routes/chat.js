'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares')

const ChatController = require('../api/controllers/ChatController')

router.get(['/', '/chat'], [auth.user], ChatController.show)
router.route('/message/:roomID').get([auth.user], ChatController.showRoom).post([auth.user], ChatController.sendMessage)

module.exports = router
