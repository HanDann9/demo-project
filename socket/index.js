'use strict'

const colors = require('colors')

const io = require('socket.io')(3000, {
  cors: {
    origin: 'http://localhost:8888',
  },
})

io.use((socket, next) => {
  const user = socket.handshake.auth.user
  if (!user) {
    return next(new Error('invalid username'))
  }

  socket.user = user
  next()
})

// Run when client connects
io.of('/').on('connection', (socket) => {
  // fetch existing users
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      id: socket.user.id,
      socketId: id,
      username: socket.user.name,
      connected: true,
    })
  }

  socket.emit('users', users)
})

io.of('/message').on('connection', (socket) => {
  // fetch existing users
  const users = []

  for (let [id, socket] of io.of('/message').sockets) {
    if (socket.user) {
      users.push({
        id: socket.user.id,
        socketId: id,
        username: socket.user.name,
        connected: true,
      })
    }
  }

  socket.emit('users', users)

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
      io.to(user.room).emit('left', {
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

console.log(`server listening at ws://localhost:3000`.yellow.bold)
