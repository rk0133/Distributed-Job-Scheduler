const express = require("express");
const router = express.Router();

console.log("✅ projectRoutes.js loaded");

router.get("/test", (req, res) => {
  return res.json({
    success: true,
    message: "Project Route Working",
  });
});

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getAllProjects);

router.get("/:id", authMiddleware, getProjectById);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;