const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

// CRUD
router.post("/", jobController.createJob);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

// Batch Jobs
router.post("/batch", jobController.createBatchJobs);

// Recurring Jobs
router.post("/recurring", jobController.createRecurringJob);

module.exports = router;