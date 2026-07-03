const Worker = require("../models/Worker");

// Create Worker
const createWorker = async (data) => {
  return await Worker.create(data);
};

// Get All Workers
const getAllWorkers = async () => {
  return await Worker.findAll();
};

// Get Worker By ID
const getWorkerById = async (id) => {
  return await Worker.findByPk(id);
};

// Update Worker
const updateWorker = async (id, data) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  await worker.update(data);

  return worker;
};

// Delete Worker
const deleteWorker = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  await worker.destroy();

  return true;
};

// Start Worker
const startWorker = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  worker.status = "ONLINE";
  worker.heartbeat = new Date();

  await worker.save();

  return worker;
};

// Stop Worker
const stopWorker = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  worker.status = "OFFLINE";

  await worker.save();

  return worker;
};

// Pause Worker
const pauseWorker = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  worker.status = "PAUSED";

  await worker.save();

  return worker;
};

// Resume Worker
const resumeWorker = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  worker.status = "ONLINE";
  worker.heartbeat = new Date();

  await worker.save();

  return worker;
};

// Heartbeat
const heartbeat = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  worker.heartbeat = new Date();

  await worker.save();

  return worker;
};

// Worker Statistics
const getWorkerStats = async (id) => {
  const worker = await Worker.findByPk(id);

  if (!worker) return null;

  return {
    worker,
    stats: {
      processedJobs: worker.processedJobs,
      failedJobs: worker.failedJobs,
      currentJobId: worker.currentJobId,
      lastHeartbeat: worker.heartbeat,
      status: worker.status,
    },
  };
};

module.exports = {
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
};