const express = require('express');
const router = express.Router();
const boardController = require('./boardController');
const upload = require('../../middleware/upload')

// create
router.post('/createContestPost', upload.uploadDocuments, boardController.createContestPost);
router.post('/createAnnouncementPost' , upload.uploadDocuments,boardController.createAnnouncementPost);
router.post('/createPhotoPost', upload.uploadImages, boardController.createPhotoPost);

// delete
router.get('/deletePost/:board_idx', boardController.deletePost);

// edit
router.post('/editContestPost', upload.uploadDocuments, boardController.editContestPost);
router.post('/editAnnouncementPost', upload.uploadDocuments, boardController.editAnnouncementPost);
router.post('/editPhotoPost',  upload.uploadImages, boardController.editPhotoPost);

// view Post (token X)
router.get('/viewContestPost/:board_idx', boardController.viewContestPost); 
router.get('/viewAnnouncementPost/:board_idx', boardController.viewAnnouncementPost); 
router.get('/viewPhotoPost/:board_idx', boardController.viewPhotoPost); // view (token X)

// view Board (token X)
router.get('/viewContestBoard/:year/:limit/:page', boardController.viewContestBoard); 
router.get('/viewAnnouncementBoard/:limit/:page', boardController.viewAnnouncementBoard); 
router.get('/viewPhotoBoard/:limit/:page', boardController.viewPhotoBoard); 

// search

 
module.exports = router;