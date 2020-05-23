const router = require('express').Router();

const { addMessage } = require("../../../controllers/AboutUs/message_controller");

router.post("/addmessage", addMessage);

module.exports = router;