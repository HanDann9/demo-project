'use strict'

const express = require('express')
const router = express.Router()
const { auth, UserValidator } = require('../middlewares')

const UserController = require('../app/controllers/UserController')

router.get('/', auth.user, UserController.show)
router
  .route('/login')
  .get(UserController.login)
  .post(UserValidator.login, UserController.handleLogin)
router.get('/logout', UserController.logout)

module.exports = router
