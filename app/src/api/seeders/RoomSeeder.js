'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      // Root
      {
        id: nanoid(21),
        roomID: '001',
        userID: '2OKobPOt-y1K-48vqvCcH',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // User
      {
        id: nanoid(21),
        roomID: '001',
        userID: 'GOhD17EChu0YcFLwj8t0x',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {})
  },
}
