const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.get('/', (request, response) => {
  response.sendFile(__dirname + "/page.html")
})
let obj ={}
// app.post('/',(req,res)=>{
io.on('connection', (socket) => {
  console.log("User Connected!");
  // io.emit('chat',socket.handshake.address)
  socket.on('store_name',(name)=>{
    obj[socket.handshake.address] = name
  })

  socket.on('chat_message', (msg) => {
    console.log()
    console.log(`message: ${msg}`);
    io.emit('chat', msg,obj[socket.handshake.address])
  })

  socket.on('disconnect', () => {
    console.log("User Disconnected!");
  })
})
// })

http.listen(port, () => {
  console.log("Congrats.... server is running on 3000 port!");
})