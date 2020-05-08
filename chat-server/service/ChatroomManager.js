const Chatroom = require('./Chatroom')
var ChatServices = require('./ChatService')

// const chatroomTemplates = require('../config/chatrooms')

module.exports = function () {
  // mapping of all available chatrooms
  const chatrooms = new Map()
  
  function addClient(user_id){
    return new Promise((resolve,reject=>{
      var ChatService
    }))
  }
  
  function removeClient(user_id) {
    chatrooms.forEach(c => c.removeUser(user_id))
  }

  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName)
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  }
}
