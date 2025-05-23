const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');


const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use( (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId]
      }
    }
  ) //type will be map
}

io.on('connection', (socket) => {
  // console.log(`User Connected : ${socket.id}`);

  socket.on('join', ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    //notify to all users that new user is joined
    clients.forEach(({ socketId }) => {
       io.to(socketId).emit('joined', {
        clients,
        username,
        socketId: socket.id,
       })
    })
  })

  socket.on('code-change', ( {roomId, code})=> {
    socket.in(roomId).emit('code-change', {code});
  })
//if new user joins, we will show him the written code previously 
socket.on('sync-code', ({socketId, code})=> {
  io.to(socketId).emit('code-change', {code});
})



  socket.on('disconnecting', ()=> {
    const rooms = [...socket.rooms];
    rooms.forEach( (roomId)=> {
      socket.in(roomId).emit('disconnected', {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  })
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server is Running"))

