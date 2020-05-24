module.exports = function ({ chat_id }) {
  const members = new Map()
  let chatHistory = []

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
  }

  // function addEntry(entry) {
  //   chatHistory = chatHistory.concat(entry)
  // }

  // function getChatHistory() {
  //   return chatHistory.slice()
  // }

  function addUser(user_id,client) {
    members.set(user_id, client)
  }

  function removeUser(user_id) {
    members.delete(user_id)
  }

  return {
    broadcastMessage,
    // addEntry,
    // getChatHistory,
    addUser,
    removeUser
    // serialize
  }
}
