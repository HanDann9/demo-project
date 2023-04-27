'use strict'

const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const { User } = require('../../app/models')

const comparePassword = async (email, password) => {
  const user = await User.findOne({
    where: { email, actived: 1 },
  })

  if (!user) {
    throw new Error('Email not found')
  }

  const isPwMatched = await bcrypt.compare(password, user.password)

  if (!isPwMatched) {
    throw new Error('Password does not match')
  }
}

const UserValidator = {
  login: [
    body('email')
      .notEmpty()
      .withMessage('Email should be left empty')
      .bail()
      .isEmail()
      .withMessage('Email field must contain a valid email address'),
    body('password')
      .notEmpty()
      .withMessage('Password should be left empty')
      .bail()
      .custom(async (password, { req }) =>
        comparePassword(req.body.email, password)
      ),
  ],
}

module.exports = UserValidator
