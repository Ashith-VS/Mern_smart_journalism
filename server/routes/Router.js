const express = require('express')
const { isRegister, isLogin, isCurrentUser } = require('../controller/authenticationController')
const verifyToken = require('../middleware/authMiddleware')
const { uploadMultipleImages, newsAdded, getNews, getMediaAdmins } = require('../controller/newsController')
const upload = require('../middleware/fileUpload')

const router = express.Router()

router.post('/register', isRegister)
router.post('/login', isLogin)
router.get('/currentuser', verifyToken, isCurrentUser)
router.get("/mediaAdmins",getMediaAdmins)
router.post('/multipleimg',upload.array("photos"),uploadMultipleImages)
router.post('/news',newsAdded)
router.get('/news',verifyToken,getNews)

module.exports = router
