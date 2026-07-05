import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import MetricCard from "../components/MetricCard";

export default function Dashboard() {
  console.log("Dashboard Component Loaded");
  const [metrics, setMetrics] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartData = [
  {
    name: "Completed",
    value: metrics.completedJobs || 0,
    color: "#16a34a",
  },
  {
    name: "Running",
    value: metrics.runningJobs || 0,
    color: "#2563eb",
  },
  {
    name: "Failed",
    value: metrics.failedJobs || 0,
    color: "#dc2626",
  },
  {
    name: "Queued",
    value: metrics.queuedJobs || 0,
    color: "#7c3aed",
  },
];

 useEffect(() => {
  loadMetrics();

  const interval = setInterval(() => {
    loadMetrics();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const loadMetrics = async () => {
  console.log("🔄 Refresh button clicked");

  try {
    const res = await api.get("/metrics");

    console.log("📊 Metrics received:", res.data.metrics);

    setMetrics(res.data.metrics);
    const executionRes = await api.get("/job-executions");

setLogs(executionRes.data.executions.slice(0, 5));
  } catch (err) {
    alert(err.message);
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
            }}
          >
            Monitor jobs, workers, queues and overall scheduler performance.
          </p>
        </div>

<button
  onClick={() => {
    alert("Refresh button clicked");
    loadMetrics();
  }}
  style={{
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Refresh
</button>
      </div>

      {loading ? (
        <h2>Loading Dashboard...</h2>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
            }}
          >
            <MetricCard
              title="Total Jobs"
              value={metrics.totalJobs || 0}
              color="#2563eb"
            />

            <MetricCard
              title="Completed"
              value={metrics.completedJobs || 0}
              color="#16a34a"
            />

            <MetricCard
              title="Running"
              value={metrics.runningJobs || 0}
              color="#f59e0b"
            />

            <MetricCard
              title="Failed"
              value={metrics.failedJobs || 0}
              color="#dc2626"
            />

            <MetricCard
              title="Queued"
              value={metrics.queuedJobs || 0}
              color="#7c3aed"
            />

            <MetricCard
              title="Workers"
              value={metrics.totalWorkers || 0}
              color="#0891b2"
            />

            <MetricCard
              title="Online Workers"
              value={metrics.onlineWorkers || 0}
              color="#15803d"
            />

            <MetricCard
              title="Queues"
              value={metrics.totalQueues || 0}
              color="#ea580c"
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
              }}
            >
              <h2>System Overview</h2>

              <p>
                This dashboard provides real-time monitoring of your
                Distributed Job Scheduler. It displays live metrics retrieved
                from the backend using REST APIs.
              </p>

              <ul>
                <li>Total Jobs</li>
                <li>Running Jobs</li>
                <li>Completed Jobs</li>
                <li>Failed Jobs</li>
                <li>Queued Jobs</li>
                <li>Workers Status</li>
                <li>Queue Statistics</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
              }}
            >
              <h2>Quick Stats</h2>

              <p><strong>Total Jobs:</strong> {metrics.totalJobs || 0}</p>

              <p><strong>Completed:</strong> {metrics.completedJobs || 0}</p>

              <p><strong>Failed:</strong> {metrics.failedJobs || 0}</p>

              <p><strong>Workers:</strong> {metrics.totalWorkers || 0}</p>

              <p><strong>Queues:</strong> {metrics.totalQueues || 0}</p>
            </div>
          </div>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginTop: "35px",
  }}
>
  <div
    style={{
      background: "#fff",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      Job Status Distribution
    </h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={110}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    }}
  >
    <h2>Recent Executions</h2>

<br />

{logs.length === 0 ? (
  <p>No execution logs found.</p>
) : (
  logs.map((log) => (
    <div
      key={log.id}
      style={{
        borderBottom: "1px solid #ddd",
        marginBottom: "10px",
        paddingBottom: "10px",
      }}
    >
      <strong>Job #{log.jobId}</strong>

      <p>Status: {log.status}</p>

      <p>Worker: {log.workerId ?? "-"}</p>

      <p>Duration: {log.duration ?? 0} ms</p>
    </div>
  ))
)}
  </div>
</div>
        </>
      )}
    </DashboardLayout>
  );
}