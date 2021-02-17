const io = require('socket.io')(3000, {
  cors: {
    origin: "*",
  },
});

const user = {};

io.on('connection', socket => {
  socket.on('username', username => {
    user[socket.id] = username;
    io.emit('user joined', user[socket.id])
  })

  socket.on('send message', msg => {
    io.emit('receive message', msg);
  })
})