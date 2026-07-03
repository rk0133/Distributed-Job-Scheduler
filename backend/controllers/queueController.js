const queueService = require("../services/queueService");

// ===============================
// Create Queue
// ===============================
exports.createQueue = async (req, res) => {
  try {
    const queue = await queueService.createQueue(req.body);

    return res.status(201).json({
      success: true,
      message: "Queue created successfully",
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Queues
// ===============================
exports.getAllQueues = async (req, res) => {
  try {
    const queues = await queueService.getAllQueues();

    return res.status(200).json({
      success: true,
      count: queues.length,
      queues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Queue By ID
// ===============================
exports.getQueueById = async (req, res) => {
  try {
    const queue = await queueService.getQueueById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Queue
// ===============================
exports.updateQueue = async (req, res) => {
  try {
    const queue = await queueService.updateQueue(
      req.params.id,
      req.body
    );

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue updated successfully",
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Queue
// ===============================
exports.deleteQueue = async (req, res) => {
  try {
    const deleted = await queueService.deleteQueue(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Pause Queue
// ===============================
exports.pauseQueue = async (req, res) => {
  try {
    const queue = await queueService.pauseQueue(req.params.id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue paused successfully",
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Resume Queue
// ===============================
exports.resumeQueue = async (req, res) => {
  try {
    const queue = await queueService.resumeQueue(req.params.id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue resumed successfully",
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Queue Statistics
// ===============================
exports.getQueueStats = async (req, res) => {
  try {
    const stats = await queueService.getQueueStats(req.params.id);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
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