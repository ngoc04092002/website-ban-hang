const express = require('express');
const router = express.Router();
const { getAllMsg,createComment ,removeComment,updateLike} = require('../controllers/comments');

router.get('/:id', getAllMsg);
router.post('/:id', createComment);
router.delete('/:id/:itemId', removeComment);
router.put('/updateLikes', updateLike);

module.exports = router;
