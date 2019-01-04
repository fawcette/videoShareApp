let roomList = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-room', roomId => {
      console.log(socket.id + "is joining room " + roomId)
      socket.join(roomId)
      if (roomList[roomId]) socket.emit('change-video', roomList[roomId].videoId)
    })

    socket.on('change-video', (videoId, roomId) => {
      io.sockets.in(roomId).emit('change-video', videoId)
      roomList[roomId] = {videoId, videoPlayerTime: 0}
    })
    
    socket.on('set-video-time', (roomId, videoPlayerTime) => {
      if (!roomList[roomId]) roomList[roomId] = {}
      roomList[roomId].videoPlayerTime = videoPlayerTime
      io.sockets.in(roomId).emit('get-video-time', videoPlayerTime)
    })

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message)
    })

    socket.on('new-room', room => {
      socket.broadcast.emit('new-room', room)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
