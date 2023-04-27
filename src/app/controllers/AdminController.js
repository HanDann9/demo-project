'use strict'

const { validationResult } = require('express-validator')
const { Admin } = require('../models')
const jwToken = require('../../utils/jwToken')

const AdminController = {
  show: (req, res) => {
    console.log('===== AdminController.show => START ===== ')
    return res.render('layouts/main')
  },

  login: async (req, res) => {
    console.log('===== AdminController.login => START ===== ')

    await jwToken.verify(req.session.accessAdmin, (err, payload) => {
      if (payload) {
        return res.redirect('/admin')
      }
    })

    return res.render('admin/login')
  },

  handleLogin: async (req, res) => {
    console.log('===== AdminController.handleLogin => START ===== ')
    try {
      const { errors } = validationResult(req)

      if (errors.length > 0) {
        return res.status(400).send({
          title: 'Notice',
          messages: errors,
        })
      }

      const admin = await Admin.findOne({
        where: { email: req.body.email, actived: 1 },
        attributes: ['id', 'email', 'password', 'role'],
      })

      const accessToken = jwToken.sign(
        {
          id: admin.id,
          email: admin.email,
          password: admin.password,
          role: admin.role,
          isAdmin: true,
        },
        1000 * 60 * 60 * 12
      )

      req.session.accessAdmin = accessToken

      return res.status(200).send({
        title: 'Notice',
        message: 'Login successful',
      })
    } catch (error) {
      return res.status(500).send({ title: 'Notice', message: error.message })
    }
  },

  logout: (req, res) => {
    console.log('===== AdminController.logout => START ===== ')

    req.session.destroy()

    return res.redirect('/admin')
  },
}

module.exports = AdminController
