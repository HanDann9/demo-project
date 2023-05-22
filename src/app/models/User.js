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
        comment: '0:Locked /  1:Actived',
      },
      role: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        comment: '0:User / 1:Admin',
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
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
