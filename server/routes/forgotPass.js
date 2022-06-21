const express = require('express');
const router = express.Router();
const { sendMail, getMail } = require('../controllers/forgotPass');

router.post('/sendmail', sendMail);
router.get('/getmail/:userId', getMail);

module.exports = router;
