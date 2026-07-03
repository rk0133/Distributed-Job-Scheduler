const express = require("express");
const router = express.Router();

const {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
  startWorker,
  stopWorker,
  pauseWorker,
  resumeWorker,
  heartbeat,
  getWorkerStats,
} = require("../controllers/workerController");

// CRUD
router.post("/", createWorker);
router.get("/", getAllWorkers);
router.get("/:id", getWorkerById);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

// Worker Management
router.post("/:id/start", startWorker);
router.post("/:id/stop", stopWorker);
router.post("/:id/pause", pauseWorker);
router.post("/:id/resume", resumeWorker);
router.post("/:id/heartbeat", heartbeat);
router.get("/:id/stats", getWorkerStats);

module.exports = router;