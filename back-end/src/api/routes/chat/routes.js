const router = require("express").Router();
const chatController = require('../../../controllers/chat/chatController')
const { valid_jwt_needed } = require("../../middleware/authorization");


router.post("/createChat", valid_jwt_needed, chatController.createChatAction);


module.exports = router;
