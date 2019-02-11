const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)


// io.on('connection',()=>{
//   console.log('You are connected!');
// }) 

app.get('/',(request,response)=>{
  response.sendFile(__dirname+"/page.html")
})

io.on('connection',(socket)=>{
  console.log("User Connected!");
  
  socket.on('chat_message',(msg)=>{
    console.log(`message: ${msg}` );
    io.emit('chat',msg)
  })
  
  socket.on('disconnect',()=>{
    console.log("User Disconnected!");
  })
})



http.listen(3000,()=>{
  console.log("Congrats.... server is running on 3000 port!");
})