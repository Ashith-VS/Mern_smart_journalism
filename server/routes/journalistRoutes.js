const express = require('express');
const { verifyToken } = require('../middleware/VerifyMiddleware');
const upload = require('../middleware/fileUpload');
const { getNewsByJournals, getDraftNews, uploadMultipleImages, newsAdded, isDraftNews, newsUpdate } = require('../controller/journalistController');
const router = express.Router();

router.get('/news', verifyToken, getNewsByJournals)
router.get("/draftnews/:id", verifyToken, getDraftNews)
router.post('/multipleimg', upload.array("photos"), uploadMultipleImages)
router.post('/news', verifyToken, newsAdded)
router.post('/draftnews', verifyToken, isDraftNews)
router.put('/news/:id', verifyToken, newsUpdate)

module.exports = router;