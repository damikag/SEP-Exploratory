const router = require('express').Router();

const researcherController = require('../../../controllers/researcher/researcherController');
const {valid_jwt_needed} =  require('../../middleware/authorization');

router.get('/',valid_jwt_needed, researcherController.indexAction);

module.exports = router