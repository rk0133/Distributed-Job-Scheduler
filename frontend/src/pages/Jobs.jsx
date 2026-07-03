import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Jobs</h1>

      <table className="w-full border border-gray-300 bg-white shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Retries</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="text-center border-t">
              <td className="p-3">{job.id}</td>
              <td className="p-3">{job.title}</td>
              <td className="p-3">{job.priority}</td>
              <td className="p-3">{job.status}</td>
              <td className="p-3">{job.retryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}