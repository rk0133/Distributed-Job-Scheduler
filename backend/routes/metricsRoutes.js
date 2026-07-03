const express = require("express");
const router = express.Router();

const metricsController = require("../controllers/metricsController");

// ===============================
// Dashboard Metrics
// ===============================
router.get("/", metricsController.getMetrics);

module.exports = router;