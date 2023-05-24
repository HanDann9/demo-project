'use strict'

const colors = require('colors')
const { User, Message, Room, Sequelize } = require('../models')
const { Op } = Sequelize

const ChatController = {
  show: async (req, res) => {
    console.log('===== AdminController.show => START ====='.blue.bold)

    const users = await User.findAll()

    return res.render('layouts/main', { users })
  },

  showRoom: async (req, res) => {
    console.log('===== AdminController.showRoom => START ====='.blue.bold)
    try {
      const users = await User.findAll()
      const roomID = req.params.roomID
      const messages = await Message.findAll({
        attributes: [
          'id',
          'roomID',
          'senderID',
          'receiverID',
          'content',
          [
            Sequelize.fn(
              'date_format',
              Sequelize.col('createdAt'),
              '%d-%m %h:%m'
            ),
            'createdAt',
          ],
        ],
        where: { roomID: roomID },
        order: [['createdAt', 'ASC']],
      })
      const room = await Room.findOne({
        where: { [Op.not]: [{ userID: req.auth.user.id }] },
      })

      const receiver = await User.findOne({ where: { id: room.userID } })

      return res.render('layouts/main', {
        users,
        receiver,
        messages,
        roomID,
      })
    } catch (error) {
      console.log(colors.red.bold(error))
    }
  },
}

module.exports = ChatController
