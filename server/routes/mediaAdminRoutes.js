const express = require('express');
const { verifyToken } = require('../middleware/VerifyMiddleware');
const { getJournalistByMediaAdmin, getJournalistDeleted, isApproved, isRejected, blockJournalist, deleteJournalist, getAllNewsByMediaAdmins } = require('../controller/mediaAdminController');
const router = express.Router();

router.get('/journalist', verifyToken, getJournalistByMediaAdmin)
router.get('/allnews', verifyToken, getAllNewsByMediaAdmins)
router.get('/remove', verifyToken,getJournalistDeleted)
router.post('/approved/:id', verifyToken, isApproved)
router.post('/rejected/:id', verifyToken, isRejected)
router.patch('/journalist/:id', verifyToken, blockJournalist)
router.patch('/journalist/delete/:id', verifyToken, deleteJournalist)

module.exports = router;