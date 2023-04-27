'use strict'

const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')
const { authAdmin, AdminValidator } = require('../middlewares')

router.get('/', authAdmin, AdminController.show)
router
  .route('/login')
  .get(AdminController.login)
  .post(AdminValidator.login, AdminController.handleLogin)
router.get('/logout', AdminController.logout)

module.exports = router
