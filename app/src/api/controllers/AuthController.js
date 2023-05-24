'use strict'

const colors = require('colors')
const { validationResult } = require('express-validator')
const { User } = require('../models')
const jwToken = require('../../utils/jwToken')

const AuthController = {
  login: async (req, res) => {
    console.log('===== AuthController.login => START ====='.blue.bold)

    await jwToken.verify(req.session.accessUser, (err, payload) => {
      if (payload) {
        return res.redirect('/user')
      }
    })

    return res.render('auth/login')
  },

  handleLogin: async (req, res) => {
    console.log('===== AuthController.handleLogin => START ====='.blue.bold)
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
        attributes: ['id', 'name', 'email', 'role'],
      })

      const accessToken = jwToken.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
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
    console.log('===== AuthController.logout => START ====='.blue.bold)

    req.session.destroy()

    return res.redirect('/')
  },
}

module.exports = AuthController
