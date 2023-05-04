'use strict'

const WebSocket = (app) => {
  const server = require('http').createServer(app)
  const WebSocket = require('ws')
  const wss = new WebSocket.Server({ server })
  const port = 3000

  wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`)

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString())
        }
      })
    })

    ws.on('close', () => console.log('Client disconnected'))
  })

  server.listen(port, () => console.log(`Server listening on port ${port}`))
}

module.exports = WebSocket
