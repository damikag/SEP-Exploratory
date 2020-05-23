const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

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

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    return next();
  }
  catch(err){
    return next(new Error('authentication error'));
  }
});

io.on('connection', function (client) {
    var user_id=client.handshake.query.id

    const {
      // handleRegister,
      // handleJoin,
      // handleLeave,
      // handleMessage,
      handleGetChatrooms,
      handlegetChatroomParticipants,
      handleMessage,
      handleGetMoreMessages,
      handleCreateChatroom,
      handleUpdateChatInfo,
      handleChangeAdmin,
      handleAddMoreParticipants,
      handleRemoveParticipant,
      handleSearchResearcher,
      handleAllResearcher,
      handleMarkSeen,
      handleGetSeen,
      // handleGetAvailableUsers,
      // handleDisconnect
    } = makeHandlers(user_id,client, clientManager)
    
    // console.log('client connected...', client.id)
    // console.log('user_id: ',user_id)
    // console.log(client)

    clientManager.addClient(client,user_id)

    // client.emit('chats',"Test chat list")
    client.on('chatrooms', handleGetChatrooms)
    client.on('getChatroomParticipants',handlegetChatroomParticipants)
    client.on('updateChatInfo',handleUpdateChatInfo)
    client.on('changeAdmin',handleChangeAdmin)
    client.on('addMoreParticipants',handleAddMoreParticipants)
    client.on('removeParticipant',handleRemoveParticipant),
    client.on('createChatroom',handleCreateChatroom)

    client.on('message', handleMessage)
    client.on('getMoreMsg',handleGetMoreMessages)

    client.on('searchReseacher',handleSearchResearcher)
    client.on('allResearcher',handleAllResearcher)

    client.on('markSeen',handleMarkSeen)
    client.on('getSeen',handleGetSeen)
    
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
  // ChatServices.getLastSeenACK(10002,10005).then((res)=>{
  //   console.log(res)
  // }).catch(err=>console.log(err))
  // ChatServices.getChats(10005).then((res)=>{
  //   console.log(res)
  // }).catch(err =>{console.log(err)})

  // var ChatRoomService = require('./service/ChatroomService')
  // ChatRoomService.allResearchers().then(res=>{console.log(res)})
  // .catch(err=>{console.log(err)})
  
  // ChatRoomService.createChatRoom({
  //   name:"Group 3 new",
  //   description:"dummy description",
  //   creator_id:10002,
  //   participants:[
  //     {
  //       user_id:10001,
  //       isAdmin:1
  //     },
  //     {
  //       user_id:10002,
  //       isAdmin:1
  //     }, 
  //     {
  //       user_id:10003,
  //       isAdmin:0
  //     }
  //   ]
  // }).then(res=>{console.log(res)})
  // .catch(err=> {console.log(res)})

server.listen(process.env.PORT, function (err) {
    if (err) throw err
    console.log('listening on port 3006')
})
