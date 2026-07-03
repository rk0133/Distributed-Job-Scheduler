const Job = require("../models/Job");
const Worker = require("../models/Worker");
const Queue = require("../models/Queue");

exports.getMetrics = async (req, res) => {
  try {
    const totalJobs = await Job.count();

    const completedJobs = await Job.count({
      where: { status: "COMPLETED" },
    });

    const runningJobs = await Job.count({
      where: { status: "RUNNING" },
    });

    const failedJobs = await Job.count({
      where: { status: "FAILED" },
    });

    const queuedJobs = await Job.count({
      where: { status: "QUEUED" },
    });

    const totalWorkers = await Worker.count();

    const onlineWorkers = await Worker.count({
      where: { status: "ONLINE" },
    });

    const pausedWorkers = await Worker.count({
      where: { status: "PAUSED" },
    });

    const totalQueues = await Queue.count();

    res.status(200).json({
      success: true,
      metrics: {
        totalJobs,
        completedJobs,
        runningJobs,
        failedJobs,
        queuedJobs,
        totalWorkers,
        onlineWorkers,
        pausedWorkers,
        totalQueues,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};