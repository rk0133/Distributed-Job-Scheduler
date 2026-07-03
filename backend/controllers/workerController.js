const workerService = require("../services/workerService");

// Create Worker
exports.createWorker = async (req, res) => {
  try {
    const worker = await workerService.createWorker(req.body);

    return res.status(201).json({
      success: true,
      message: "Worker created successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Workers
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllWorkers();

    return res.status(200).json({
      success: true,
      count: workers.length,
      workers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Worker By ID
exports.getWorkerById = async (req, res) => {
  try {
    const worker = await workerService.getWorkerById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Worker
exports.updateWorker = async (req, res) => {
  try {
    const worker = await workerService.updateWorker(req.params.id, req.body);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker updated successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Worker
exports.deleteWorker = async (req, res) => {
  try {
    const deleted = await workerService.deleteWorker(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Start Worker
exports.startWorker = async (req, res) => {
  try {
    const worker = await workerService.startWorker(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker started successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Stop Worker
exports.stopWorker = async (req, res) => {
  try {
    const worker = await workerService.stopWorker(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker stopped successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pause Worker
exports.pauseWorker = async (req, res) => {
  try {
    const worker = await workerService.pauseWorker(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker paused successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Resume Worker
exports.resumeWorker = async (req, res) => {
  try {
    const worker = await workerService.resumeWorker(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker resumed successfully",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Worker Heartbeat
exports.heartbeat = async (req, res) => {
  try {
    const worker = await workerService.heartbeat(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Heartbeat updated",
      worker,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Worker Statistics
exports.getWorkerStats = async (req, res) => {
  try {
    const stats = await workerService.getWorkerStats(req.params.id);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      ...stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};