const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const holdingscontroller = require("../controllers/holdingscontroller");

router.get("/" , authMiddleware ,  holdingscontroller.getHoldings);

module.exports = router;