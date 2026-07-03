const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ScheduledJob = sequelize.define(
  "ScheduledJob",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    cron: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    runAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ScheduledJob;