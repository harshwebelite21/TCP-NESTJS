const net = require('net');

const client = new net.Socket();
const PORT = 5000;
const SERVER_HOST = 'localhost';

client.connect(PORT, SERVER_HOST, () => {
  console.log('Connected to Server');
  // Send a request to the server
  client.write('Hello, can you give me the current date and time?');
});

client.on('data', (data) => {
  console.log('Received from server:', data.toString());
  // Close the client after receiving the response
  client.destroy();
});

client.on('close', () => {
  console.log('Connection closed');
});
