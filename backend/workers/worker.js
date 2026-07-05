const { Worker: BullWorker } = require("bullmq");
const connection = require("../config/redis");

const Job = require("../models/Job");
const Worker = require("../models/Worker");
const JobExecution = require("../models/JobExecution");
const deadLetterQueue = require("../scheduler/deadLetterQueue");

// Worker ID in database
let dbWorker;

async function initializeWorker() {
  dbWorker = await Worker.findOne({
    where: { name: "Worker-1" },
  });

  if (!dbWorker) {
    dbWorker = await Worker.create({
      name: "Worker-1",
      status: "ONLINE",
      heartbeat: new Date(),
    });
  } else {
    dbWorker.status = "ONLINE";
    dbWorker.heartbeat = new Date();
    await dbWorker.save();
  }
}

initializeWorker();

// Automatic Heartbeat (every 5 seconds)
setInterval(async () => {
  if (!dbWorker) return;

  dbWorker.heartbeat = new Date();
  await dbWorker.save();

  console.log("💓 Worker Heartbeat Updated");
}, 5000);

const worker = new BullWorker(
  "distributed-job-queue",
  async (job) => {
    console.log("=================================");
    console.log("🚀 Processing Job");
    console.log(job.data);
    console.log("=================================");

    const dbJob = await Job.findByPk(job.data.jobId);

    if (dbJob) {
      dbJob.status = "RUNNING";
      dbJob.workerId = dbWorker.id;
      await dbJob.save();
    }
    const execution = await JobExecution.create({
  jobId: dbJob.id,
  workerId: dbWorker.id,
  status: "RUNNING",
  retryAttempt: job.attemptsMade,
  startedAt: new Date(),
});

    dbWorker.status = "BUSY";
    dbWorker.currentJobId = dbJob.id;
    await dbWorker.save();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (job.data.title.toUpperCase().includes("FAIL")) {
      throw new Error("Simulated Job Failure");
    }

    dbJob.status = "COMPLETED";
    await dbJob.save();

    dbWorker.status = "ONLINE";
    dbWorker.currentJobId = null;
    dbWorker.processedJobs += 1;
    await dbWorker.save();
    execution.status = "COMPLETED";
execution.completedAt = new Date();
execution.duration =
  execution.completedAt.getTime() - execution.startedAt.getTime();

await execution.save();

    console.log("✅ Job Completed");

    return true;
  },
  {
    connection,
  }
);

worker.on("failed", async (job, err) => {
  const dbJob = await Job.findByPk(job.data.jobId);

  if (dbJob) {
    dbJob.retryCount = job.attemptsMade;

    if (job.attemptsMade === job.opts.attempts) {
      dbJob.status = "FAILED";

      await deadLetterQueue.add("failed-job", {
        jobId: dbJob.id,
        reason: err.message,
      });
    }

    await dbJob.save();
  }

  dbWorker.status = "ONLINE";
  dbWorker.currentJobId = null;
  dbWorker.failedJobs += 1;
  dbWorker.lastError = err.message;
  await dbWorker.save();
});

console.log("✅ Worker Started");

module.exports = worker;