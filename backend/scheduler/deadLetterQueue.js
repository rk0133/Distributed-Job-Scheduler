const { Queue } = require("bullmq");
const connection = require("../config/redis");

const deadLetterQueue = new Queue("dead-letter-queue", {
  connection,
});

console.log("✅ Dead Letter Queue Created");

module.exports = deadLetterQueue;