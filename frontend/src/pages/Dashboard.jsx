import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import MetricCard from "../components/MetricCard";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const res = await api.get("/metrics");
      setMetrics(res.data.metrics);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">
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
          title="Online"
          value={metrics.onlineWorkers || 0}
          color="#15803d"
        />

        <MetricCard
          title="Queues"
          value={metrics.totalQueues || 0}
          color="#ea580c"
        />
      </div>
    </DashboardLayout>
  );
}