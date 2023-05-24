'use strict'

const { nanoid } = require('nanoid')

module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define(
    'Room',
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
      userID: {
        type: Sequelize.STRING(21),
        allowNull: false,
      },
    },
    {
      tableName: 'Rooms',
      timestamps: true,
      paranoid: true,
    }
  )

  return Room
}
