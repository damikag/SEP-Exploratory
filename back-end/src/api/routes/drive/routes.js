const { mongo, connection } = require('mongoose');
const router = require('express').Router();
const driveController = require('../../../controllers/drive/driveController');
const {valid_jwt_needed} =  require('../../middleware/authorization');
const uploadvar=require ('../../../mongo/connect')

  //upload file to db
 
router.post('/upload',uploadvar.upload,driveController.uploadFilesAction);
router.post('/createfolder',valid_jwt_needed,driveController.createFolderAction);
router.post('/deletefolder',valid_jwt_needed,driveController.deleteFolderAction);
router.post('/getfolders',valid_jwt_needed,driveController.getFoldersAction);
router.post('/searchfolder',valid_jwt_needed,driveController.searchFoldersAction);
router.post('/getfiles',valid_jwt_needed,driveController.getGroupFilesAction);
router.post('/gettxtfiles',valid_jwt_needed,driveController.getGroupTxtFilesAction);

module.exports = router;
  //  body-parser multer multer-gridfs-storage gridfs-stream method-override
  