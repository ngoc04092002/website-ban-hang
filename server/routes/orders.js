const express = require('express');
const router = express.Router();
const { createOrders,getOrders,deleteOrders } = require('../controllers/order');

router.post('/customer-order',createOrders);
router.get('/customer-order/:user',getOrders);
//delete orders
router.post('/delete-order',deleteOrders);


module.exports = router;
