const ChatServices = require('./ChatService')
const MessageServices = require('./MessageService')
const ChatroomService = require('./ChatroomService')

module.exports = function (user_id, client, clientManager) {
  
  // function handleRegister(userName, callback) {
  //   if (!clientManager.isUserAvailable(userName))
  //     return callback('user is not available')

  //   const user = clientManager.getUserByName(userName)
  //   clientManager.registerClient(client, user)

  //   return callback(null, user)
  // }

  function handleGetChatrooms(_,callback){
    ChatServices.getChats(user_id).then((res)=>{return callback(null,res)})
    .catch(err=>{return callback(err,null)})
    
  }

  function handleMessage(message = {}, callback) {
    // console.log(message)
    MessageServices.saveMessages(message)
    .then((res)=>{
      MessageServices.getSenderDetails(message.sender_id)
      .then((res2)=>{
        var savedMsg=Object.assign({
          id:res.insertId,
          first_name:res2[0].first_name,
          last_name:res2[0].last_name,
          profile_picture:res2[0].profile_picture,
          email:res2[0].email,
        },message)
        clientManager.broadcastMessage(savedMsg)
      }).catch(err=>{console.log(err)})
      
    })
    .catch(err=>{console.log(err)})
  
  }

  function handleGetMoreMessages(chat_id,lastMsg_id,callback){
    ChatServices.getMoreMessages(chat_id,lastMsg_id)
    .then(res=>callback(res)).catch(err=>callback([]))
  }

  function handleCreateChatroom(chatDetails,callback){
      ChatroomService.createChatRoom(chatDetails)
      .then(res=>{callback(res)}).catch(err=>callback(err))
  }

  function handlegetChatroomParticipants(chat_id,callback){
      ChatroomService.getParticipants(chat_id)
      .then(res=>{callback(res)}).catch(err=>{callback([])})
  }

  function handleGetDirrectChat(user1_id,user2_id,callback){
      ChatroomService.getDirrectChat(user1_id,user2_id)
      .then((res)=>{callback(res)}).catch(err=>{callback(null)})
  }

  function handleUpdateChatInfo(chatInfo,callback){
    ChatroomService.updateChatInfo(chatInfo)
    .then(res=>{callback(res)}).catch( err=> {callback({success:false,message:"Update Failed!"})})
  }

  function handleChangeAdmin(userInfo,callback){
    ChatroomService.changeAdmin(userInfo)
    .then(res=>{callback(res)}).catch(err=>{callback({success:false,message:"Update Failed!"})})
  }

  function handleAddMoreParticipants(usersInfo,callback){
    ChatroomService.addMoreParticipants(usersInfo)
    .then(res=>{callback(res)}).catch(err=>{callback({success:false,message:"Participant addition Failed!"})})
  }

  function handleRemoveParticipant(chat_id,user_id,callback){
    ChatroomService.removeParticipant(chat_id,user_id)
    .then(res=>{callback(res)}).catch(err=>{callback({success:false,message:"Participant removal Failed!"})})
  }

  function handleSearchResearcher(searchString,callback){
    ChatroomService.searchResearchers(searchString)
    .then(res=>{callback(res)}).catch(err=>{console.log(err);callback(null)})
  }

  function handleAllResearcher(callback){
    ChatroomService.allResearchers()
    .then(res=>{callback(res)}).catch(err=>{console.log(err);callback(null)})
  }
 
  function handleMarkSeen(MsgInfo,callback){
    MessageServices.markSeen(MsgInfo.chat_id,MsgInfo.user_id,MsgInfo.message_id)
    .then(res=>{callback(res)}).catch(err=>{callback(null)})
  }

  function handleGetSeen(chat_id,message_id,callback){
    MessageServices.getSeen(chat_id,message_id)
    .then(res=>{callback(res)}).catch(err=>{callback([])})
  }

  function handleMarkDeliver(MsgInfo,callback){
    MessageServices.markDeliver(MsgInfo.chat_id,MsgInfo.user_id,MsgInfo.message_id)
    .then(res=>{callback(res)}).catch(err=>{callback(null)})
  }

  function handleGetDeliver(chat_id,message_id,callback){
    MessageServices.getDeliver(chat_id,message_id)
    .then(res=>{callback(res)}).catch(err=>{callback([])})
  }


  return {
    // handleRegister,
    handleGetChatrooms,
    handlegetChatroomParticipants,
    handleGetDirrectChat,
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
    handleMarkDeliver,
    handleGetDeliver,
  }
}
