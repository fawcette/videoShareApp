import io from 'socket.io-client'

const socket = io(window.location.origin)

let room = "bobo"

socket.on('connect', () => {
  console.log('Connected!')

  socket.emit('join-room', room)
})

export default socket
