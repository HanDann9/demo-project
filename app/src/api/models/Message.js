'use strict'

const { nanoid } = require('nanoid')

module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },
      roomID: {
        type: Sequelize.STRING(21),
        allowNull: false,
      },
      senderID: {
        type: Sequelize.STRING(21),
        allowNull: false,
      },
      receiverID: {
        type: Sequelize.STRING(21),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'Messages',
      timestamps: true,
      paranoid: true,
    }
  )

  return Message
}
