const express = require("express");
const router = express.Router();

const {
  pauseQueue,
  resumeQueue,
} = require("../controllers/queueControlController");

router.post("/pause", pauseQueue);
router.post("/resume", resumeQueue);

module.exports = router;