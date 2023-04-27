'use strict'

const AdminRouter = require('./admin')
const UserRouter = require('./user')

const routes = (app) => {
  app.use('/admin', AdminRouter)
  app.use('/user', UserRouter)
}

module.exports = routes
