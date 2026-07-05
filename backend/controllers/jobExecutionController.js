const jobExecutionService = require("../services/jobExecutionService");

// Get All Execution Logs
exports.getAllExecutions = async (req, res) => {
  try {
    const executions = await jobExecutionService.getAllExecutions();

    return res.status(200).json({
      success: true,
      count: executions.length,
      executions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Execution By ID
exports.getExecutionById = async (req, res) => {
  try {
    const execution = await jobExecutionService.getExecutionById(req.params.id);

    if (!execution) {
      return res.status(404).json({
        success: false,
        message: "Execution log not found",
      });
    }

    return res.status(200).json({
      success: true,
      execution,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};