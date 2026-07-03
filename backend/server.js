
 const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables FIRST
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// NOW import sequelize
const sequelize = require("./config/database");

// Load all models
require("./models");

// Routes
const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Distributed Job Scheduler Backend Running 🚀");
});

app.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "HELLO FROM THE LATEST SERVER",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/projects", projectRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database Synced");
    console.log("✅ MySQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Database Error:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});