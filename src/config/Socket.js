'use strict'

const port = process.env.PORT || 3000
const { Server } = require('socket.io')
const http = require('http')
const moment = require('moment')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('../utils/handleSocket')

const Socket = (app) => {
  const server = http.createServer(app)
  const io = new Server(server)

  io.use((socket, next) => {
    const username = socket.handshake.auth.username

    if (!username) {
      return next(new Error('invalid username'))
    }

    socket.username = username

    next()
  })

  // Run when client connects
  io.on('connection', (socket) => {
    // fetch existing users
    const users = []

    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: socket.username,
      })
    }

    socket.on('join room', ({ username, room }) => {
      const user = userJoin(socket.id, username, room)

      socket.join(user.room)

      // Broadcast when a user connects
      socket.broadcast.to(user.room).emit('joined', {
        username: user.username,
        content: `${user.username} has joined the chat`,
        time: moment().format('h:mm a'),
      })

      // Send users and room info
      io.to(user.room).emit('room users', {
        room: user.room,
        user: getRoomUsers(user.room),
      })
    })

    // Listen for chatMessage
    socket.on('chat message', (msg) => {
      const user = getCurrentUser(socket.id)

      io.to(user.room).emit('message', {
        username: user.username,
        content: msg,
        time: moment().format('h:mm a'),
      })
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id)

      if (user) {
        io.to(user.room).emit('user left chatroom', {
          username: user.username,
          content: `${user.username} has left the chat`,
          time: moment().format('h:mm a'),
        })

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        })
      }
    })
  })

  server.listen(port, () =>
    console.log(`server listening at http://localhost:${port}`)
  )
}

module.exports = Socket
