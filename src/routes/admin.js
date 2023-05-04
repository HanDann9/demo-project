'use strict'

const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')
const { auth, AdminValidator } = require('../middlewares')

router.get('/', auth.admin, AdminController.show)
router
  .route('/login')
  .get(AdminController.login)
  .post(AdminValidator.login, AdminController.handleLogin)
router.get('/logout', AdminController.logout)

module.exports = router
