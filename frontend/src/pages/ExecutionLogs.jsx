import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function ExecutionLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const res = await api.get("/job-executions");
    setLogs(res.data.executions);
  };

  return (
    <DashboardLayout>
      <h1 style={{ marginBottom: 25 }}>Execution Logs</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            <th style={{ padding: 15 }}>ID</th>
            <th>Job</th>
            <th>Worker</th>
            <th>Status</th>
            <th>Retry</th>
            <th>Duration(ms)</th>
            <th>Started</th>
            <th>Completed</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              <td style={{ padding: 12 }}>{log.id}</td>
              <td>{log.jobId}</td>
              <td>{log.workerId}</td>
              <td>{log.status}</td>
              <td>{log.retryAttempt}</td>
              <td>{log.duration}</td>
              <td>{new Date(log.startedAt).toLocaleString()}</td>
              <td>
                {log.completedAt
                  ? new Date(log.completedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}