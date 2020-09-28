const express = require("express");
const router = express.Router();
const maturities = require("../services/maturities")


// api/weeklymaturities
router.get("/:email", maturities.getWeeklyMaturities);

module.exports = router;
