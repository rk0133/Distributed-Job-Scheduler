const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobExecution = sequelize.define(
  "JobExecution",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    workerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "RUNNING",
        "COMPLETED",
        "FAILED"
      ),
      allowNull: false,
    },

    retryAttempt: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = JobExecution;