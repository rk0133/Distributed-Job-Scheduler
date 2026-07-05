const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// ===============================
// Load Environment Variables
// ===============================
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// ===============================
// Database
// ===============================
const sequelize = require("./config/database");
const connection = require("./config/redis");

// ===============================
// Load Models
// ===============================
require("./models");

// ===============================
// BullMQ Scheduler
// ===============================
require("./scheduler/scheduler");
require("./scheduler/deadLetterQueue");

// ===============================
// Worker
// ===============================
const worker = require("./workers/worker");

// ===============================
// Routes
// ===============================
const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const jobRoutes = require("./routes/jobRoutes");
const queueRoutes = require("./routes/queueRoutes");
const workerRoutes = require("./routes/workerRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const jobExecutionRoutes = require("./routes/jobExecutionRoutes");
const retryRoutes = require("./routes/retryRoutes");
const queueControlRoutes = require("./routes/queueControlRoutes");

const app = express();

// ===============================
// REQUEST LOGGER
// ===============================
app.use((req, res, next) => {
  console.log("==================================");
  console.log("➡️ REQUEST RECEIVED");
  console.log("METHOD :", req.method);
  console.log("URL    :", req.originalUrl);
  console.log("==================================");
  next();
});

// ===============================
// Middleware
// ===============================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// Root Route
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Distributed Job Scheduler Backend Running");
});

// ===============================
// Health Route
// ===============================
app.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "HELLO FROM THE LATEST SERVER",
  });
});

// ===============================
// Debug Route
// ===============================
app.get("/raushan-test", (req, res) => {
  console.log("✅ RAUSHAN TEST ROUTE HIT");

  res.json({
    success: true,
    message: "THIS IS MY EXPRESS SERVER",
    timestamp: new Date(),
  });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/organizations", (req, res, next) => {
  console.log("✅ ORGANIZATION ROUTE REACHED");
  next();
});

app.use("/api/organizations", organizationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/job-executions", jobExecutionRoutes);
app.use("/api/retry", retryRoutes);
app.use("/api/queue-control", queueControlRoutes);

// ===============================
// 404
// ===============================
app.use((req, res) => {
  console.log("❌ Route Not Found :", req.originalUrl);

  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Database
// ===============================
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database Synced");
    console.log("✅ MySQL Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Database Error:", err);
  });

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("==================================");
  console.log(`✅ Server running on port ${PORT}`);
  console.log("==================================");
});

// ===============================
// Graceful Shutdown
// ===============================
async function shutdown() {
  console.log("\n🛑 Gracefully shutting down...");

  try {
    await worker.close();
    console.log("✅ BullMQ Worker Closed");

    await connection.quit();
    console.log("✅ Redis Connection Closed");

    server.close(() => {
      console.log("✅ HTTP Server Closed");
      process.exit(0);
    });
  } catch (err) {
    console.error("Shutdown Error:", err);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);