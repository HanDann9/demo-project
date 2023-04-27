'use strict'

const authAdmin = require('./auth/admin.auth')
const authUser = require('./auth/user.auth')
const AdminValidator = require('./validators/admin.validator')
const UserValidator = require('./validators/user.validator')

module.exports = {
  authAdmin,
  authUser,
  AdminValidator,
  UserValidator,
}
