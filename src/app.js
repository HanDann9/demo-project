const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const logger = require('morgan')
const dotenv = require('dotenv')
const port = process.env.PORT || 8888
const oneDay = 1000 * 60 * 60 * 24
dotenv.config()

const routes = require('./routes')
const WebSocket = require('./config/WebSocket')

app.use(
  sessions({
    secret: 'secret is secret',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes init
routes(app)

// WebSocket init
WebSocket(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
