const router = require('express').Router();

const homeController = require('../../../controllers/home/homeController');
router.get('/', homeController.indexAction);

module.exports = router