// const userTemplates = require('../config/users')
const ChatServices = require('./ChatService')
const MessageServices = require('./MessageService')

module.exports = function () {
  // mapping of all connected clients
  const clients = new Map()
  const clientToUser= new Map()

  function addClient(client,user_id) {
    console.log("ClientManager: client added ",user_id)
    // clients.set(user_id, client )
    clients.set(client.id,client)
    clientToUser.set(client.id,user_id)

    ChatServices.getChats(user_id).then(res =>{
      client.emit('chats',res)
    })
    .catch(err=>{console.log(err)}) 
  }

  // function registerClient(client, user) {
  //   clients.set(client.id, { client, user })
  // }

  function broadcastMessage(message) {
    MessageServices.getParticipants(message.chat_id)
    .then(async results=>{
      
      receipinats=new Set()

      await results.forEach(res=>{
        receipinats.add(res.user_id.toString())
      })
      
      clients.forEach((eachClient,client_id) => {
      
        if(receipinats.has(clientToUser.get(client_id))){
          eachClient.emit('message', message)
        }
        
      })

    })
    .catch(err=>console.log(err))

  }

  function removeClient(user_id,client_id) {
    // clients.delete(user_id)
    clients.delete(client_id)
    clientToUser.delete(client_id)
    console.log("ClientManager: removed client ", user_id)
  }
 
  // function getAvailableUsers() {
  //   const usersTaken = new Set(
  //     Array.from(clients.values())
  //       .filter(c => c.user)
  //       .map(c => c.user.name)
  //   )
  //   return userTemplates
  //     .filter(u => !usersTaken.has(u.name))
  // }

  function getOnlineUsers(){
    return Array.from(clients.keys())
  }
  // function isUserAvailable(userName) {
  //   return getAvailableUsers().some(u => u.name === userName)
  // }

  // function getUserByName(userName) {
  //   return userTemplates.find(u => u.name === userName)
  // }

  // function getUserByClientId(clientId) {
  //   return (clients.get(clientId) || {}).user
  // }

  return {
    addClient,
    // registerClient,
    removeClient,
    broadcastMessage,
    // getAvailableUsers,
    // isUserAvailable,
    // getUserByName,
    // getUserByClientId
    getOnlineUsers
  }
}
