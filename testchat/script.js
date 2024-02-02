const socket = new WebSocket("wss://guilded1.github.io");

socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server");
});

socket.addEventListener("message", (event) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p>${event.data}</p>`;
});

socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed:', event);
});

function setUsername(username) {
  socket.send(JSON.stringify({ type: 'setUsername', username }));
}

function getUsername() {
  return prompt('Enter your username:');
}

document.getElementById('setUsernameButton').addEventListener('click', () => {
  const username = getUsername();
  setUsername(username);
});

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.send(message);
    messageInput.value = "";
  }
}
