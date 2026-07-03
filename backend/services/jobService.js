const Job = require("../models/Job");
const jobQueue = require("../scheduler/scheduler");
const crypto = require("crypto");

// ===============================
// Create Single Job
// ===============================
const createJob = async (data) => {
  const job = await Job.create({
    ...data,
    isRecurring: data.isRecurring || false,
    cronExpression: data.cronExpression || null,
    nextRunAt: data.isRecurring ? data.scheduledAt : null,
    batchId: data.batchId || null,
  });

  const delay = Math.max(
    new Date(data.scheduledAt).getTime() - Date.now(),
    0
  );

  const priorityMap = {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
  };

  const options = {
    delay,
    priority: priorityMap[data.priority] || 5,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  };

  // ===============================
  // Recurring Jobs (Cron)
  // ===============================
  if (job.isRecurring && job.cronExpression) {
    options.repeat = {
      pattern: job.cronExpression,
    };
  }

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
    options
  );

  return job;
};

// ===============================
// Create Batch Jobs
// ===============================
const createBatchJobs = async (jobsData) => {
  const batchId = crypto.randomUUID();

  const jobs = [];

  for (const data of jobsData) {
    const job = await createJob({
      ...data,
      batchId,
    });

    jobs.push(job);
  }

  return jobs;
};

// ===============================
// Get All Jobs
// ===============================
const getAllJobs = async () => {
  return await Job.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// ===============================
// Get Job By ID
// ===============================
const getJobById = async (id) => {
  return await Job.findByPk(id);
};

// ===============================
// Update Job
// ===============================
const updateJob = async (id, data) => {
  const job = await Job.findByPk(id);

  if (!job) return null;

  await job.update(data);

  return job;
};

// ===============================
// Delete Job
// ===============================
const deleteJob = async (id) => {
  const job = await Job.findByPk(id);

  if (!job) return null;

  await job.destroy();

  return true;
};

module.exports = {
  createJob,
  createBatchJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};