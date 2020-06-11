const {
  createChat_validation
} = require("./validation");


var ChatroomService = require('../../service/chat/ChatroomService')

module.exports.createChatAction = (req, res) => {
  const { error } = createChat_validation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  ChatroomService.createChatRoom(req.body)
  .then(result=>{

    if(result.success){
      return res.status(200).json(result);
    }
    else{
      return res.status(400).json(result);
    }
  })
  .catch(err=>{
    return res.status(500).json({ error: err.message });
  })


};
