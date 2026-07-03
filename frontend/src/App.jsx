import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Queues from "./pages/Queues";
import Workers from "./pages/Workers";
import Organizations from "./pages/Organizations";
import Projects from "./pages/Projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/queues" element={<Queues />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;