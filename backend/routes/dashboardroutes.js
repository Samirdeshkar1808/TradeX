const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const dashboard = require('../controllers/dashboard');

router.post("/" , authMiddleware ,dashboard.getdashboard);

module.exports = router;
