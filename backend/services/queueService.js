const Queue = require("../models/Queue");
const Job = require("../models/Job");

const createQueue = async (data) => {
  return await Queue.create(data);
};

const getAllQueues = async () => {
  return await Queue.findAll();
};

const getQueueById = async (id) => {
  return await Queue.findByPk(id);
};

const updateQueue = async (id, data) => {
  const queue = await Queue.findByPk(id);

  if (!queue) return null;

  await queue.update(data);

  return queue;
};

const deleteQueue = async (id) => {
  const queue = await Queue.findByPk(id);

  if (!queue) return null;

  await queue.destroy();

  return true;
};

// ===============================
// Pause Queue
// ===============================
const pauseQueue = async (id) => {
  const queue = await Queue.findByPk(id);

  if (!queue) return null;

  queue.paused = true;

  await queue.save();

  return queue;
};

// ===============================
// Resume Queue
// ===============================
const resumeQueue = async (id) => {
  const queue = await Queue.findByPk(id);

  if (!queue) return null;

  queue.paused = false;

  await queue.save();

  return queue;
};

// ===============================
// Queue Statistics
// ===============================
const getQueueStats = async (id) => {
  const queue = await Queue.findByPk(id);

  if (!queue) return null;

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

  return {
    queue,
    stats: {
      totalJobs,
      completedJobs,
      runningJobs,
      failedJobs,
      queuedJobs,
    },
  };
};

module.exports = {
  createQueue,
  getAllQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  pauseQueue,
  resumeQueue,
  getQueueStats,
};