'use strict'

const jwToken = require('../utils/jwToken')

const auth = {
  admin: (req, res, next) => {
    const token = req.session.accessAdmin

    if (!token) {
      console.log('Access token not found')
      return res.redirect('/admin/login')
    }

    jwToken.verify(token, (err, decoded) => {
      if (err) {
        console.log('You do not have access to this feature')
        return res.redirect('/admin/login')
      }

      res.locals.auth = { user: decoded }
      next()
    })
  },

  user: (req, res, next) => {
    const token = req.session.accessUser

    if (!token) {
      console.log('Access token not found')
      return res.redirect('/user/login')
    }

    jwToken.verify(token, (err, decoded) => {
      if (err) {
        console.log('You do not have access to this feature')
        return res.redirect('/admin/login')
      }

      res.locals.auth = { user: decoded }
      next()
    })
  },
}

module.exports = auth
