const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received request: ${data}`);
    socket.write(`Current Date and Time: ${new Date().toString()}`);
  });

  socket.on('end', () => console.log('Client disconnected'));
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
