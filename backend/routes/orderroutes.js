const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const ordercontroller = require("../controllers/ordercontroller");


const router = express.Router();

router.get('/recent' , authMiddleware , ordercontroller.getRecentOrders);

router.post('/buy', authMiddleware , ordercontroller.buyStock);

router.post('/sell', authMiddleware , ordercontroller.sellStock);


module.exports = router;