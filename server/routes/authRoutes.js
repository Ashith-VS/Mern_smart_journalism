const express = require('express');
const router = express.Router();
const { verifyToken, checkTokenBlacklist } = require('../middleware/VerifyMiddleware');
const { isCurrentUser, isLogOut, isRegister, isLogin, isChangePassword, isUpdateProfile } = require('../controller/authenticationController');
const { sendCredentialsEmail } = require('../controller/emailController');

router.get('/currentuser', verifyToken, isCurrentUser)
router.get('/logout', verifyToken, checkTokenBlacklist, isLogOut)
router.post('/send-credentials', verifyToken, sendCredentialsEmail)
router.post('/register', isRegister)
router.post('/login', isLogin)
router.post('/changePassword', verifyToken, isChangePassword)
router.post('/updateProfile', verifyToken, isUpdateProfile)

module.exports = router;