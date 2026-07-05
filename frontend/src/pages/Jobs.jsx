import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

 useEffect(() => {
  loadJobs();

  const interval = setInterval(loadJobs, 5000);

  return () => clearInterval(interval);
}, []);
  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const retryJob = async (id) => {
    try {
      await api.post(`/retry/${id}`);
      alert("Job added back to queue.");
      loadJobs();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#dc2626";
      case "MEDIUM":
        return "#f59e0b";
      case "LOW":
        return "#16a34a";
      default:
        return "#64748b";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "#16a34a";
      case "RUNNING":
        return "#2563eb";
      case "FAILED":
        return "#dc2626";
      case "QUEUED":
        return "#7c3aed";
      default:
        return "#64748b";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "34px" }}>
            Job Management
          </h1>

          <p style={{ color: "#666" }}>
            View and monitor all scheduled jobs.
          </p>
        </div>

        <button
          onClick={loadJobs}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Refresh
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search Job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="ALL">All Status</option>
          <option value="QUEUED">Queued</option>
          <option value="RUNNING">Running</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <h2 style={{ padding: "30px" }}>Loading...</h2>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#2563eb",
                color: "#fff",
              }}
            >
              <tr>
                <th style={{ padding: "16px" }}>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Retries</th>
                <th>Scheduled</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "16px" }}>{job.id}</td>

                  <td>{job.title}</td>

                  <td>
                    <span
                      style={{
                        background: priorityColor(job.priority),
                        color: "#fff",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {job.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        background: statusColor(job.status),
                        color: "#fff",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>{job.retryCount}</td>

                  <td>
                    {job.scheduledAt
                      ? new Date(job.scheduledAt).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    {job.status === "FAILED" ? (
                      <button
                        onClick={() => retryJob(job.id)}
                        style={{
                          background: "#f59e0b",
                          color: "#fff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Retry
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: "30px" }}>
                    No Jobs Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}