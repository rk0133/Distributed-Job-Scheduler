const express = require("express");
const router = express.Router();

const {
  getAllExecutions,
  getExecutionById,
} = require("../controllers/jobExecutionController");

// Get All Execution Logs
router.get("/", getAllExecutions);

// Get Single Execution Log
router.get("/:id", getExecutionById);

module.exports = router;