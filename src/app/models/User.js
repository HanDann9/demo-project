'use strict'

const { nanoid } = require('nanoid')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(191),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      actived: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1:Actived / 2:Locked',
      },
      role: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        comment: '1:User / 2:Manager',
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      paranoid: true,
    }
  )

  return User
}
