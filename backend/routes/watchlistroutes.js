const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const watchlistcontroller  = require("../controllers/watchlistcontroller");
const { route } = require("./orderroutes");


router.post("/add" , authMiddleware, watchlistcontroller.addStock);

router.get("/" , authMiddleware , watchlistcontroller.getStock);

router.delete("/:stockId", authMiddleware , watchlistcontroller.deleteStock);

module.exports = router;