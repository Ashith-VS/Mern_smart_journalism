const express = require('express')
const { isRegister, isLogin, isCurrentUser } = require('../controller/authenticationController')
const verifyToken = require('../middleware/authMiddleware')
const { uploadMultipleImages, newsAdded, getNewsByJournals, getMediaAdmins, getAllNewsByMediaAdmins, getJournalistByMediaAdmin, deleteJournalist, isApproved, isRejected, getAllNews, getJournalist, getAllMediasName, getAllMediasNews, isSavedNews, getSavedNews, getAllApprovedNews } = require('../controller/newsController')
const upload = require('../middleware/fileUpload')

const router = express.Router()

router.post('/register', isRegister)
router.post('/login', isLogin)
router.get('/currentuser', verifyToken, isCurrentUser)

// superAdmin
router.get("/mediaAdmins", getMediaAdmins)
router.get('/allNewss', getAllNews)
router.get("/journalist/:id", getJournalist)

// mediaAdmins
router.get('/journalist', verifyToken, getJournalistByMediaAdmin)
router.delete('/journalist/:id', deleteJournalist)
router.post('/approved/:id', isApproved)
router.post('/rejected/:id', isRejected)

// journalist
router.post('/multipleimg', upload.array("photos"), uploadMultipleImages)
router.post('/news', newsAdded)
router.get('/news', verifyToken, getNewsByJournals)
router.get('/allnews', verifyToken, getAllNewsByMediaAdmins)

// public
router.get('/latestNews', getAllApprovedNews)
router.get('/media', getAllMediasName)
router.get("/mediaNews/:id", getAllMediasNews)
router.post('/savednews', isSavedNews)
router.get("/savedNews/:id", getSavedNews)

module.exports = router
