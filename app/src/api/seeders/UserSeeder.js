'use strict'

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: nanoid(21),
        name: 'root',
        email: 'root@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 1, // 1 is admin role
        image:
          'https://i.pinimg.com/564x/f0/a3/44/f0a344551001f7ed0f3022c3abae2560.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: nanoid(21),
        name: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 1, // 1 is admin role
        image:
          'https://i.pinimg.com/564x/f0/a3/44/f0a344551001f7ed0f3022c3abae2560.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: nanoid(21),
        name: 'user',
        email: 'user@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 0, // 0 is user role
        image:
          'https://i.pinimg.com/564x/03/26/26/032626472f09ce0e02132a769cc2e559.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: nanoid(21),
        name: 'manager',
        email: 'manager@gmail.com',
        password: await bcrypt.hash('123123', 10),
        actived: 1,
        role: 0, // 0 is user role
        image:
          'https://i.pinimg.com/564x/03/26/26/032626472f09ce0e02132a769cc2e559.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
