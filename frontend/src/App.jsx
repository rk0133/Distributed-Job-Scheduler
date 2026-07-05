import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Queues from "./pages/Queues";
import Workers from "./pages/Workers";
import Organizations from "./pages/Organizations";
import Projects from "./pages/Projects";
import CreateJob from "./pages/CreateJob";
import ExecutionLogs from "./pages/ExecutionLogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/queues" element={<Queues />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/execution-logs" element={<ExecutionLogs />} />
    </Routes>
  );
}

export default App;