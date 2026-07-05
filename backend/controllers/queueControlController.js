const jobQueue = require("../scheduler/scheduler");

exports.pauseQueue = async (req, res) => {
  try {
    await jobQueue.pause();

    res.json({
      success: true,
      message: "Queue Paused",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.resumeQueue = async (req, res) => {
  try {
    await jobQueue.resume();

    res.json({
      success: true,
      message: "Queue Resumed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};