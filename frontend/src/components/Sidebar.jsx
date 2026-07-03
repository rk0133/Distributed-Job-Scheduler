import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Scheduler
      </h1>

      <div className="space-y-5">

        <Link to="/">Dashboard</Link>

        <br />

        <Link to="/jobs">Jobs</Link>

        <br />

        <Link to="/workers">Workers</Link>

        <br />

        <Link to="/queues">Queues</Link>

        <br />

        <Link to="/organizations">Organizations</Link>

        <br />

        <Link to="/projects">Projects</Link>

      </div>

    </div>
  );
}