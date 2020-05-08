const dotenv = require('dotenv');
dotenv.config();

const server = require('http').createServer()
const io = require('socket.io')(server)


const ClientManager = require('./service/ClientManager')
// const ChatroomManager = require('./service/ChatroomManager')
const makeHandlers = require('./service/handlers')

const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()

 
// middle where for Authentication
io.use((socket, next) => {
  let id = socket.handshake.query.id;
  let token = socket.handshake.query.token

  // console.log(id,token)
  if(true || token)
    return next();
  
  return next(new Error('authentication error'));
});

io.on('connection', function (client) {
    var user_id=client.handshake.query.id

    const {
      // handleRegister,
      // handleJoin,
      // handleLeave,
      // handleMessage,
      handleGetChatrooms,
      handleMessage,
      // handleGetAvailableUsers,
      // handleDisconnect
    } = makeHandlers(user_id,client, clientManager)
    
    // console.log('client connected...', client.id)
    // console.log('user_id: ',user_id)
    // console.log(client)

    clientManager.addClient(client,user_id)

    // client.emit('chats',"Test chat list")
    client.on('chatrooms', handleGetChatrooms)

    client.on('message', handleMessage)
  
    client.on('disconnect', function () {
      // console.log('client disconnect...', client.id)
      clientManager.removeClient(user_id,client.id)
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
  // }).catch(err=>console.log(err))
  // ChatServices.getChats(10005).then((res)=>{
  //   console.log(res)
  // }).catch(err =>{console.log(err)})

server.listen(process.env.PORT, function (err) {
    if (err) throw err
    console.log('listening on port 3006')
})
