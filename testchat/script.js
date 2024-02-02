const socket = new WebSocket("wss://guilded1.github.io");

socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server");
});

socket.addEventListener("message", (event) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p>${event.data}</p>`;
});

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.send(message);
    messageInput.value = "";
  }
}