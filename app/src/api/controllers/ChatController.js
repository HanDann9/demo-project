'use strict'

const { User } = require('../models')

const ChatController = {
  show: async (req, res) => {
    console.log('===== AdminController.show => START ===== ')

    const users = await User.findAll()

    return res.render('layouts/main', { users })
  },

  showRoom: async (req, res) => {
    console.log('===== AdminController.showRoom => START ===== ')

    const users = await User.findAll()
    const user = await User.findOne({ where: { name: 'user' } })
    const roomID = req.param.roomID

    return res.render('layouts/main', { users, user, roomID })
  },
}

module.exports = ChatController
