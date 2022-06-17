const express = require('express');
const router = express.Router();
const { feedback } = require('../controllers/feedback');

router.post('/',feedback);

module.exports = router;
