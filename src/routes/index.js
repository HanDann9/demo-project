'use strict'

const AuthRouter = require('./auth')
const ChatRouter = require('./chat')

const routes = (app) => {
  app.use('/', AuthRouter)
  app.use('/', ChatRouter)
}

module.exports = routes
