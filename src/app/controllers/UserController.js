'use strict'

const { validationResult } = require('express-validator')
const { User } = require('../models')
const jwToken = require('../../utils/jwToken')

const UserController = {
  show: (req, res) => {
    console.log('===== UserController.show => START ===== ')
    return res.render('layouts/main')
  },

  login: async (req, res) => {
    console.log('===== UserController.login => START ===== ')

    await jwToken.verify(req.session.accessUser, (err, payload) => {
      if (payload) {
        return res.redirect('/user')
      }
    })

    return res.render('user/login')
  },

  handleLogin: async (req, res) => {
    console.log('===== UserController.handleLogin => START ===== ')
    try {
      const { errors } = validationResult(req)

      if (errors.length > 0) {
        return res.status(400).send({
          title: 'Notice',
          messages: errors,
        })
      }
      const user = await User.findOne({
        where: { email: req.body.email, actived: 1 },
        attributes: ['id', 'email', 'password', 'role'],
      })

      const accessToken = jwToken.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role,
          isAdmin: false,
        },
        1000 * 60 * 60 * 12
      )

      req.session.accessUser = accessToken

      return res.status(200).send({
        title: 'Notice',
        message: 'Login successful',
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ title: 'Notice', message: error.message })
    }
  },

  logout: (req, res) => {
    console.log('===== UserController.logout => START ===== ')

    req.session.destroy()

    return res.redirect('/user')
  },
}

module.exports = UserController
