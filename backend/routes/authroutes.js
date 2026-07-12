const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const authController = require('../controllers/authuser');

router.post('/login' , authController.login);

router.post('/signup' , authController.signup);


module.exports = router;
 