const express = require('express')
const { isRegister, isLogin, isCurrentUser, isChangePassword, isUpdateProfile, isLogOut } = require('../controller/authenticationController')
const { verifyToken, checkTokenBlacklist } = require('../middleware/VerifyMiddleware')
const { uploadMultipleImages, newsAdded, getNewsByJournals, getMediaAdmins, getAllNewsByMediaAdmins, getJournalistByMediaAdmin, deleteJournalist, isApproved, isRejected, getAllNews, getJournalist, getAllMediasName, getAllMediasNews, isSavedNews, getSavedNews, getAllApprovedNews } = require('../controller/newsController')
const upload = require('../middleware/fileUpload')

const router = express.Router()

router.post('/register', isRegister)
router.post('/login', isLogin)
router.get('/currentuser', verifyToken, isCurrentUser)
router.post('/changePassword', verifyToken, isChangePassword)
router.post('/updateProfile', verifyToken, isUpdateProfile)
router.get('/logout', verifyToken, checkTokenBlacklist, isLogOut)

// superAdmin
router.get("/mediaAdmins", verifyToken, getMediaAdmins)
router.get('/allNewss', verifyToken, getAllNews)
router.get("/journalist/:id", verifyToken, getJournalist)

// mediaAdmins
router.get('/journalist', verifyToken, getJournalistByMediaAdmin)
router.delete('/journalist/:id', verifyToken, deleteJournalist)
router.post('/approved/:id', verifyToken, isApproved)
router.post('/rejected/:id', verifyToken, isRejected)

// journalist
router.post('/multipleimg', upload.array("photos"), uploadMultipleImages)
router.post('/news', verifyToken, newsAdded)
router.get('/news', verifyToken, getNewsByJournals)
router.get('/allnews', verifyToken, getAllNewsByMediaAdmins)

// public
router.get('/latestNews', getAllApprovedNews)
router.get('/media', getAllMediasName)
router.get("/mediaNews/:id", getAllMediasNews)
router.post('/savednews', verifyToken, isSavedNews)
router.get("/savedNews/:id", verifyToken, getSavedNews)

module.exports = router

