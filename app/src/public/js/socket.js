import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'

const socket = io('ws://localhost:3000')

socket.auth = { user }
socket.connect()

socket.on('users', (users) => {
  console.log(users)
  users.forEach((user) => {
    if ($(`.user-${user.id}`)[0]) {
      const statusIcon = user.connected ? 'bg-success' : 'bg-danger'
      const status = user.connected ? 'Online' : 'Offline'

      $(`.status-icon-${user.id}`).removeClass('bg-danger').addClass(statusIcon)
      $(`.status-${user.id}`).text(status)

      $(`.user-${user.id}`).addClass('list-group-item-info')
    }
  })
})
