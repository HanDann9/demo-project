const socket = window.location.pathname.includes('/message')
  ? io('/message', { query: 'roomID=001' })
  : io('/')

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
