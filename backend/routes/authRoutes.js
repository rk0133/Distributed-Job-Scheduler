const express = require("express");
const router = express.Router();

console.log("authRoutes.js loaded");

const {
  register,
  login,
} = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working"
  });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;