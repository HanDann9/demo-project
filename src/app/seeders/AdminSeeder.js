'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [
      {
        id: nanoid(21),
        name: 'John',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: nanoid(21),
        name: 'San',
        email: 'root@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {})
  },
}
