const JobExecution = require("../models/JobExecution");

// Get All Execution Logs
const getAllExecutions = async () => {
  return await JobExecution.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// Get Execution By ID
const getExecutionById = async (id) => {
  return await JobExecution.findByPk(id);
};

module.exports = {
  getAllExecutions,
  getExecutionById,
};