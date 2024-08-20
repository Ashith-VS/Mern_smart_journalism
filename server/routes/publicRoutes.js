const express = require('express');
const { verifyToken } = require('../middleware/VerifyMiddleware');
const { getAllApprovedNews, getAllMediasName, getAllMediasNews, getSavedNews, isSavedNews} = require('../controller/publicController');
const router = express.Router();

router.get('/latestNews', getAllApprovedNews)
router.get('/media', getAllMediasName)
router.get("/mediaNews/:id", getAllMediasNews)
router.get("/savedNews/:id", verifyToken, getSavedNews)
router.post('/savednews', verifyToken, isSavedNews)

module.exports = router;