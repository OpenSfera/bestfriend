import openSocket from 'socket.io-client';
const  socket = openSocket();

function subscribeToChat(cb) {
  socket.on('reply', reply => cb(null, reply));
  socket.emit('chat message', 1000);
}

export { subscribeToChat };
