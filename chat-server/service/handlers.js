const ChatServices = require('./ChatService')
const MessageServices = require('./MessageService')

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
    // const createEntry = () => ({ message })

    // handleEvent(chatroomName, createEntry)
    //   .then(() => callback(null))
    //   .catch(callback)
  }
 
  return {
    // handleRegister,
    handleGetChatrooms,
    handleMessage
  }
}
