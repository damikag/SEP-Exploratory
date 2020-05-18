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
router.post('/readtxtfile',valid_jwt_needed,driveController.readFileAction);
router.post('/sharefile',valid_jwt_needed,driveController.shareFileAction);
router.post('/notsharefile',valid_jwt_needed,driveController.notshareFileAction);
router.post('/deletefile',valid_jwt_needed,driveController.deleteFilesAction);
router.post('/softdeletefile',valid_jwt_needed,driveController.softDeleteFilesAction);
router.post('/downloadfile',valid_jwt_needed,driveController.getFileAction);
router.post('/searchfile',valid_jwt_needed,driveController.searchFilesAction);
router.post('/turntopdf',valid_jwt_needed,driveController.ToPdfAction);
module.exports = router;
  //  body-parser multer multer-gridfs-storage gridfs-stream method-override
  