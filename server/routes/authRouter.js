const express = require('express');
const router = express.Router();
const {login,register,logout,refreshToken,logInSocial,updateAccount} =require('../controllers/auth')

router.post('/login',login)
router.post('/register',register)
router.post('/login-social',logInSocial)
router.get('/logout',logout)
router.get('/refresh',refreshToken)
router.put('/update/:userId',updateAccount)


module.exports = router;