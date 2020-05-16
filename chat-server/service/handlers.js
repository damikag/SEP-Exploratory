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

  function handleCreateChatroom(chatDetails,callback){
      ChatroomService.createChatRoom(chatDetails)
      .then(res=>{callback(res)}).catch(err=>callback(err))
  }

  function handlegetChatroomParticipants(chat_id,callback){
      ChatroomService.getParticipants(chat_id)
      .then(res=>{callback(res)}).catch(err=>{callback([])})
  }

  function handleUpdateChatInfo(chatInfo,callback){
    ChatroomService.updateChatInfo(chatInfo)
    .then(res=>{callback(res)}).catch( err=> {callback({success:false,message:"Update Failed!"})})
  }

  function handleChangeAdmin(userInfo,callback){
    ChatroomService.changeAdmin(userInfo)
    .then(res=>{callback(res)}).catch(err=>{callback({success:false,message:"Update Failed!"})})
  }

  function handleSearchResearcher(searchString,callback){
    ChatroomService.searchResearchers(searchString)
    .then(res=>{callback(res)}).catch(err=>{console.log(err);callback(null)})
  }

  function handleAllResearcher(callback){
    ChatroomService.allResearchers()
    .then(res=>{callback(res)}).catch(err=>{console.log(err);callback(null)})
  }
 
  return {
    // handleRegister,
    handleGetChatrooms,
    handlegetChatroomParticipants,
    handleMessage,
    handleCreateChatroom,
    handleUpdateChatInfo,
    handleChangeAdmin,
    handleSearchResearcher,
    handleAllResearcher,
  }
}
