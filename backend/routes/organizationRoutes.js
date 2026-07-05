const express = require("express");
const router = express.Router();

const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

const authMiddleware = require("../middleware/authMiddleware");

// All Organization routes are protected
router.post("/", authMiddleware, createOrganization);

router.get("/", getOrganizations);

router.get("/:id", authMiddleware, getOrganizationById);

router.put("/:id", authMiddleware, updateOrganization);

router.delete("/:id", authMiddleware, deleteOrganization);

module.exports = router;