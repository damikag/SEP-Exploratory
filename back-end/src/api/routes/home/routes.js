const router = require('express').Router();

const homeController = require('../../../controllers/home/homeController');
const userController = require('../../../controllers/user/userController')
router.get('/', homeController.indexAction);

router.post('/register',userController.registerAction);

module.exports = router