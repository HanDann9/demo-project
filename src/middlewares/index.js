'use strict'

const auth = require('./auth')
const AdminValidator = require('./validators/admin.validator')
const UserValidator = require('./validators/user.validator')

module.exports = {
  auth,
  AdminValidator,
  UserValidator,
}
