import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Queues() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
  loadQueues();

  const interval = setInterval(loadQueues, 5000);

  return () => clearInterval(interval);
}, []);

  const loadQueues = async () => {
    try {
      const res = await api.get("/queues");
      setQueues(res.data.queues || []);
    } catch (err) {
      console.error(err);
    }
  };

  const pauseQueue = async () => {
    try {
      await api.post("/queue-control/pause");
      alert("Queue Paused");
      loadQueues();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const resumeQueue = async () => {
    try {
      await api.post("/queue-control/resume");
      alert("Queue Resumed");
      loadQueues();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Queue Management</h1>

        <div>
          <button
            onClick={loadQueues}
            style={{
              marginRight: "10px",
              padding: "10px 18px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>

          <button
            onClick={pauseQueue}
            style={{
              marginRight: "10px",
              padding: "10px 18px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Pause
          </button>

          <button
            onClick={resumeQueue}
            style={{
              padding: "10px 18px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Resume
          </button>
        </div>
      </div>

      <table
        className="w-full border border-gray-300 bg-white shadow rounded-lg"
      >
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Queue</th>
            <th className="p-3">Project</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Concurrency</th>
            <th className="p-3">Retry</th>
            <th className="p-3">Paused</th>
            <th className="p-3">Jobs</th>
            <th className="p-3">Completed</th>
            <th className="p-3">Failed</th>
          </tr>
        </thead>

        <tbody>
          {queues.map((queue) => (
            <tr key={queue.id} className="text-center border-t">
              <td className="p-3">{queue.id}</td>
              <td className="p-3">{queue.name}</td>
              <td className="p-3">{queue.projectId}</td>
              <td className="p-3">{queue.priority}</td>
              <td className="p-3">{queue.concurrencyLimit}</td>
              <td className="p-3">{queue.retryLimit}</td>
              <td className="p-3">
                {queue.paused ? "🛑 Yes" : "✅ No"}
              </td>
              <td className="p-3">{queue.totalJobs}</td>
              <td className="p-3">{queue.completedJobs}</td>
              <td className="p-3">{queue.failedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}