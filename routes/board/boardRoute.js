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

// view Previous Post
router.get('/viewPreviousContestPost/:board_idx', boardController.viewPreviousContestPost); 
router.get('/viewPreviousAnnouncementPost/:board_idx', boardController.viewPreviousAnnouncementPost); 
router.get('/viewPreviousPhotoPost/:board_idx', boardController.viewPreviousPhotoPost); 

// view Next Post
router.get('/viewNextContestPost/:board_idx', boardController.viewNextContestPost); 
router.get('/viewNextAnnouncementPost/:board_idx', boardController.viewNextAnnouncementPost); 
router.get('/viewNextPhotoPost/:board_idx', boardController.viewNextPhotoPost); 

// count Post (token X)
router.get('/countContest/:year', boardController.countContest); 
router.get('/countAnnouncement', boardController.countAnnouncement); 
router.get('/countPhoto', boardController.countPhoto); 

// view Board (token X)
router.get('/viewContestBoard/:year/:limit/:page', boardController.viewContestBoard); 
router.get('/viewAnnouncementBoard/:limit/:page', boardController.viewAnnouncementBoard); 
router.get('/viewPhotoBoard/:limit/:page', boardController.viewPhotoBoard); 

// search
router.get('/searchContest/:search_word/:year/:limit/:page', boardController.searchContest); 
router.get('/searchAnnouncement/:search_word/:limit/:page', boardController.searchAnnouncement); 
router.get('/searchPhoto/:search_word/:limit/:page', boardController.searchPhoto); 

// preview
router.get('previewContest', boardController.previewContest);
router.get('previewAnnouncement', boardController.previewAnnouncement);
module.exports = router;