const socketUrl = 'http://localhost:9000';

let connectButton;
let disconnectButton;
let socket;
let responseText;

const connect = () => {

  let error = null;

  socket = io(socketUrl, {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('Connected');
    responseText.innerHTML = 'Connected';
    connectButton.disabled = true;
    disconnectButton.disabled = false;
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${error || reason}`);
    responseText.innerHTML = `Disconnected: ${error || reason}`;
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    error = null;
  });

  socket.on("connect_error", () => {
    console.error('Could not connect!')
    responseText.innerHTML = `Could not connect`;
  });

  socket.open();
};

const disconnect = () => {
  socket.disconnect();
}

document.addEventListener('DOMContentLoaded', () => {
  connectButton = document.getElementById('connect');
  disconnectButton = document.getElementById('disconnect');
  responseText = document.getElementById('responseText')
});