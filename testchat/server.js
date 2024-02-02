const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Allow connections from GitHub Pages domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://guilded1.github.io');
  next();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
