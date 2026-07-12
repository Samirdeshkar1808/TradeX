const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const stockscontroller = require("../controllers/stockscontroller");


router.get('/' , authMiddleware , stockscontroller.showallStocks);

module.exports = router;