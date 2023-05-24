'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      // Root
      {
        id: nanoid(21),
        roomID: '001',
        senderID: '2OKobPOt-y1K-48vqvCcH',
        receiverID: 'GOhD17EChu0YcFLwj8t0x',
        content: 'Hi, I am admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      // User
      {
        id: nanoid(21),
        roomID: '001',
        senderID: 'GOhD17EChu0YcFLwj8t0x',
        receiverID: '2OKobPOt-y1K-48vqvCcH',
        content: 'Hi, I am user',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {})
  },
}
