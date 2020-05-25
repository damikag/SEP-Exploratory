const router = require("express").Router();

const homeController = require('../../../controllers/home/homeController');
const userController = require('../../../controllers/user/userController');
const researcherController = require("../../../controllers/researcher/researcherController");

const {valid_jwt_needed} =  require('../../middleware/authorization');

router.get("/", homeController.indexAction);

router.post("/register", userController.registerAction);
router.post("/temp-register", userController.temporaryUserRegisterAction);

router.post("/logout", valid_jwt_needed, userController.logoutAction);
router.post("/login", userController.loginAction);

router.get('/auth',valid_jwt_needed,userController.authAction);
router.post('/search',homeController.SearchAction)
router.get("/feed",researcherController.feedAction);

module.exports = router;
