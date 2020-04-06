const router = require('express').Router();

const userController = require('../../../controllers/user/userController')

router.post('/',userController.registerAction);

module.exports = router