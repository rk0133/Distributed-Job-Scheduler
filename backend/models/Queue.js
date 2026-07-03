const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Queue = sequelize.define(
  "Queue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM(
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
      ),
      defaultValue: "MEDIUM",
    },

    concurrencyLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },

    retryLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },

    retryStrategy: {
      type: DataTypes.ENUM(
        "FIXED",
        "LINEAR",
        "EXPONENTIAL"
      ),
      defaultValue: "FIXED",
    },

    retryDelay: {
      type: DataTypes.INTEGER,
      defaultValue: 5000,
    },

    paused: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    totalJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    completedJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    failedJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Queue;