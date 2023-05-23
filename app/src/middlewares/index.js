'use strict'

const auth = require('./auth')
const UserValidator = require('./validators/user.validator')

module.exports = {
  auth,
  UserValidator,
}
