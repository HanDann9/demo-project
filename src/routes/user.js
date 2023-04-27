'use strict'

const express = require('express')
const router = express.Router()
const { authUser, UserValidator } = require('../middlewares')

const UserController = require('../app/controllers/UserController')

router.get('/', authUser, UserController.show)
router
  .route('/login')
  .get(UserController.login)
  .post(UserValidator.login, UserController.handleLogin)
router.get('/logout', UserController.logout)

module.exports = router
