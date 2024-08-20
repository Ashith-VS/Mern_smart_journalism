const express = require('express');
const { verifyToken } = require('../middleware/VerifyMiddleware');
const { getMediaAdmins, getAllNews, getJournalist, getDeletedJournalist, getMediaAdminDeleted, blockMediaAdmins, deleteMediaAdmin } = require('../controller/superAdminController');
const router = express.Router();

router.get("/mediaAdmins", verifyToken, getMediaAdmins)
router.get('/allNewss', verifyToken, getAllNews)
router.get("/journalist/:id", verifyToken, getJournalist)
router.get("/journalist/deleted/:id", verifyToken, getDeletedJournalist)
router.get("/mediaAdmin/deleted", verifyToken, getMediaAdminDeleted)
router.patch('/mediaAdmin/:id', verifyToken, blockMediaAdmins)
router.patch('/mediaAdmin/delete/:id', verifyToken, deleteMediaAdmin)

module.exports = router;