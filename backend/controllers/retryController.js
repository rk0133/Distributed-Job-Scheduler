const Job = require("../models/Job");
const jobQueue = require("../scheduler/scheduler");

exports.retryJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.update({
      status: "QUEUED",
      retryCount: 0,
    });

    const priorityMap = {
      HIGH: 1,
      MEDIUM: 5,
      LOW: 10,
    };

    await jobQueue.add(
      "execute-job",
      {
        jobId: job.id,
        title: job.title,
        priority: job.priority,
        isRecurring: job.isRecurring,
        cronExpression: job.cronExpression,
        batchId: job.batchId,
      },
      {
        priority: priorityMap[job.priority] || 5,
        attempts: 3,
      }
    );

    return res.json({
      success: true,
      message: "Job added back to queue",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};