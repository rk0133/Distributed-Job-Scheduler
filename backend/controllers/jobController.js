const jobService = require("../services/jobService");

// ===============================
// Create Single Job
// ===============================
exports.createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);

    res.status(201).json({
      success: true,
      message: "Job Created & Added To Queue",
      job,
    });
  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Create Batch Jobs
// ===============================
exports.createBatchJobs = async (req, res) => {
  try {
    const jobs = await jobService.createBatchJobs(req.body);

    res.status(201).json({
      success: true,
      message: "Batch Jobs Created Successfully",
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Create Recurring Job
// ===============================
exports.createRecurringJob = async (req, res) => {
  try {
    const job = await jobService.createJob({
      ...req.body,
      isRecurring: true,
    });

    res.status(201).json({
      success: true,
      message: "Recurring Job Created Successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get All Jobs
// ===============================
exports.getAllJobs = async (req, res) => {
  const jobs = await jobService.getAllJobs();

  res.json({
    success: true,
    jobs,
  });
};

// ===============================
// Get Job By ID
// ===============================
exports.getJobById = async (req, res) => {
  const job = await jobService.getJobById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
    job,
  });
};

// ===============================
// Update Job
// ===============================
exports.updateJob = async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
    job,
  });
};

// ===============================
// Delete Job
// ===============================
exports.deleteJob = async (req, res) => {
  const deleted = await jobService.deleteJob(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
  });
};