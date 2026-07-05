import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Workers() {
  const [workers, setWorkers] = useState([]);

 useEffect(() => {
  loadWorkers();

  const interval = setInterval(loadWorkers, 5000);

  return () => clearInterval(interval);
}, []);

  const loadWorkers = async () => {
    try {
      const res = await api.get("/workers");
      setWorkers(res.data.workers || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Workers</h1>

      <table className="w-full border border-gray-300 bg-white shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Current Job</th>
            <th className="p-3">Processed</th>
            <th className="p-3">Failed</th>
            <th className="p-3">Heartbeat</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id} className="text-center border-t">
              <td className="p-3">{worker.id}</td>
              <td className="p-3">{worker.name}</td>

              <td className="p-3">
                <span
                  style={{
                    color:
                      worker.status === "ONLINE"
                        ? "green"
                        : worker.status === "BUSY"
                        ? "orange"
                        : worker.status === "PAUSED"
                        ? "blue"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {worker.status}
                </span>
              </td>

              <td className="p-3">
                {worker.currentJobId || "-"}
              </td>

              <td className="p-3">
                {worker.processedJobs}
              </td>

              <td className="p-3">
                {worker.failedJobs}
              </td>

              <td className="p-3">
                {worker.heartbeat
                  ? new Date(worker.heartbeat).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}