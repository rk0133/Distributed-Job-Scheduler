const express = require("express");
const router = express.Router();

const {
  createQueue,
  getAllQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  pauseQueue,
  resumeQueue,
  getQueueStats,
} = require("../controllers/queueController");

// CRUD
router.post("/", createQueue);
router.get("/", getAllQueues);
router.get("/:id", getQueueById);
router.put("/:id", updateQueue);
router.delete("/:id", deleteQueue);

// Queue Features
router.post("/:id/pause", pauseQueue);
router.post("/:id/resume", resumeQueue);
router.get("/:id/stats", getQueueStats);

module.exports = router;