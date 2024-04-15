// collaboration-toolkit.js

const WebSocket = require('ws');

class CollaborationToolkit {
  constructor() {
    this.clients = [];
    this.server = new WebSocket.Server({ port: 8080 });

    this.server.on('connection', (ws) => {
      this.handleConnection(ws);
    });
  }

  handleConnection(ws) {
    this.clients.push(ws);

    ws.on('message', (message) => {
      this.handleMessage(ws, message);
    });

    ws.on('close', () => {
      this.handleClose(ws);
    });
  }

  handleMessage(ws, message) {
    this.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  handleClose(ws) {
    this.clients = this.clients.filter((client) => client !== ws);
  }
}

module.exports = CollaborationToolkit;
