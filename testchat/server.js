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

server.on('error', (error) => {
  console.error('Server error:', error);
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require('dotenv').config();
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
