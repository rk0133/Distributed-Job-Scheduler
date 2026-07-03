const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Worker = sequelize.define(
  "Worker",
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

    status: {
      type: DataTypes.ENUM(
        "ONLINE",
        "OFFLINE",
        "BUSY",
        "PAUSED"
      ),
      defaultValue: "OFFLINE",
    },

    heartbeat: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    currentJobId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    processedJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    failedJobs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lastError: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Worker;