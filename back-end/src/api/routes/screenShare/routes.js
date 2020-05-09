const router = require('express').Router();

const screenShareController = require('../../../controllers/screenShare/screenShareController');

const {valid_jwt_needed} =  require('../../middleware/authorization');

router.get('/token',valid_jwt_needed,screenShareController.getTokenAction);

module.exports = router

