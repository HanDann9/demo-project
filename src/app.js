const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const logger = require('morgan')
const oneDay = 1000 * 60 * 60 * 24

const routes = require('./routes')
const Socket = require('./config/Socket')

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

// Socket init
Socket(app)

// app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
