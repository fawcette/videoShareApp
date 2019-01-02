module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-room', room => {
      console.log(socket.id + "is joining room " + room)
      socket.join(room)
    })

    socket.on('change-video', videoId => {
      io.sockets.in('bobo').emit('change-video', videoId)
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
