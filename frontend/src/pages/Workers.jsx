import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Workers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const res = await api.get("/workers");
      setWorkers(res.data.workers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Workers</h1>

      <table className="w-full border bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Processed</th>
            <th>Failed</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.status}</td>
              <td>{worker.processedJobs}</td>
              <td>{worker.failedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
