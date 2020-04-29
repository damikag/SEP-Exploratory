const dotenv = require('dotenv');
dotenv.config();

const server = require('http').createServer()
const io = require('socket.io')(server)

// middle where for Authentication
io.use((socket, next) => {
  let id = socket.handshake.query.id;
  let token = socket.handshake.query.token

  console.log(id,token)
  if(true || token)
    return next();
  
  return next(new Error('authentication error'));
});

io.on('connection', function (client) {
    
    console.log('client connected...', client.id)
    // console.log(client)

    client.on('message', (msg) => {
        console.log(msg)
    })
  
    client.on('disconnect', function () {
      console.log('client disconnect...', client.id)
    //   handleDisconnect()
    })
  
    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })
  })

  var ChatServices = require('./service/ChatService')

  // ChatServices.getMessages(10001).then((res)=>{
  //   console.log(res)
  // }).catch(err =>{console.log(err)})

server.listen(process.env.PORT, function (err) {
    if (err) throw err
    console.log('listening on port 3005')
})
