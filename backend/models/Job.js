const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM(
        "QUEUED",
        "RUNNING",
        "COMPLETED",
        "FAILED"
      ),
      defaultValue: "QUEUED",
    },

    priority: {
      type: DataTypes.ENUM(
        "LOW",
        "MEDIUM",
        "HIGH"
      ),
      defaultValue: "MEDIUM",
    },

    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    payload: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    retryCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    workerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // ===========================
    // NEW FIELDS
    // ===========================

    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    cronExpression: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    nextRunAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    batchId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Job;