const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RetryPolicy = sequelize.define(
  "RetryPolicy",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    strategy: {
      type: DataTypes.ENUM(
        "FIXED",
        "LINEAR",
        "EXPONENTIAL"
      ),
      allowNull: false,
    },

    maxRetries: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },

    delay: {
      type: DataTypes.INTEGER,
      defaultValue: 5000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RetryPolicy;