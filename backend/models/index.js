const User = require("./User");
const Organization = require("./Organization");
const Project = require("./Project");

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

// Export all models
module.exports = {
  User,
  Organization,
  Project,
};