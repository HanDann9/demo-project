'use strict'

const jwToken = require('../../utils/jwToken')

module.exports = (req, res, next) => {
  const token = req.session.accessAdmin

  if (!token) {
    console.log('Access token not found')
    return res.redirect('/admin/login')
  }

  jwToken.verify(token, (err, decoded) => {
    if (err || !decoded.isAdmin) {
      console.log('You do not have access to this feature')
      return res.redirect('/admin/login')
    }

    res.locals.auth = { user: decoded }

    next()
  })
}
