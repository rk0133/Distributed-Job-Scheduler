const { Queue } = require("bullmq");
const connection = require("../config/redis");

const jobQueue = new Queue("distributed-job-queue", {
  connection,
});

console.log("✅ BullMQ Queue Created");

module.exports = jobQueue;