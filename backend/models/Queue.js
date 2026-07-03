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

    paused: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Queue;