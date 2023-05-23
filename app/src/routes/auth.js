'use strict'

const express = require('express')
const router = express.Router()
const AuthController = require('../api/controllers/AuthController')
const { UserValidator } = require('../middlewares')

router
  .route('/login')
  .get(AuthController.login)
  .post(UserValidator.login, AuthController.handleLogin)
router.get('/logout', AuthController.logout)

module.exports = router
