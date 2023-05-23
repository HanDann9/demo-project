'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares')

const ChatController = require('../api/controllers/ChatController')

router.get(['/', '/chat'], [auth.user], ChatController.show)
router.get('/message/:roomID', [auth.user], ChatController.showRoom)

module.exports = router
