const User = require("./User");
const Organization = require("./Organization");
const Project = require("./Project");
const Queue = require("./Queue");
const Job = require("./Job");
const Worker = require("./Worker");
const JobExecution = require("./JobExecution");

// =========================
// Organization ↔ Project
// =========================
Organization.hasMany(Project, {
  foreignKey: "organizationId",
  onDelete: "CASCADE",
});

Project.belongsTo(Organization, {
  foreignKey: "organizationId",
});

// =========================
// Project ↔ Queue
// =========================
Project.hasMany(Queue, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Queue.belongsTo(Project, {
  foreignKey: "projectId",
});

// =========================
// Worker ↔ Job
// =========================
Worker.hasMany(Job, {
  foreignKey: "workerId",
  onDelete: "SET NULL",
});

Job.belongsTo(Worker, {
  foreignKey: "workerId",
});

// =========================
// Job ↔ JobExecution
// =========================
Job.hasMany(JobExecution, {
  foreignKey: "jobId",
  onDelete: "CASCADE",
});

JobExecution.belongsTo(Job, {
  foreignKey: "jobId",
});

// =========================
// Worker ↔ JobExecution
// =========================
Worker.hasMany(JobExecution, {
  foreignKey: "workerId",
  onDelete: "SET NULL",
});

JobExecution.belongsTo(Worker, {
  foreignKey: "workerId",
});

// Export all models
module.exports = {
  User,
  Organization,
  Project,
  Queue,
  Job,
  Worker,
  JobExecution,
};