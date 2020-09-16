const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

// api/income
router.get("/:email", incomeController.getIncomes);

module.exports = router;
