const router = require('express').Router();

const editorController = require('../../../controllers/editor/editorController');

const {valid_jwt_needed} =  require('../../middleware/authorization');



router.post('/createpost',valid_jwt_needed,editorController.createAction);

router.post('/editpost',editorController.editAction);
router.post('/getblogs',editorController.getBlogAction);
router.post('/getpost',valid_jwt_needed,editorController.getPostAction);
router.post('/deletepost',valid_jwt_needed,editorController.deletePostAction);



module.exports = router