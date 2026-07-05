import {
  FaTachometerAlt,
  FaTasks,
  FaUsers,
  FaProjectDiagram,
  FaBuilding,
  FaServer,
  FaPlusCircle,
  FaHistory,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: <FaTasks />,
  },
  {
    name: "Create Job",
    path: "/create-job",
    icon: <FaPlusCircle />,
  },
  {
  name: "Execution Logs",
  path: "/execution-logs",
  icon: <FaHistory />,
},
  {
    name: "Workers",
    path: "/workers",
    icon: <FaUsers />,
  },
  {
    name: "Queues",
    path: "/queues",
    icon: <FaServer />,
  },
  {
    name: "Organizations",
    path: "/organizations",
    icon: <FaBuilding />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <FaProjectDiagram />,
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#0f172a",
        color: "#fff",
        padding: "25px 18px",
        boxSizing: "border-box",
        boxShadow: "2px 0 15px rgba(0,0,0,.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🚀 Scheduler
      </h2>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px",
            marginBottom: "10px",
            textDecoration: "none",
            color: "#fff",
            borderRadius: "10px",
            background: isActive ? "#2563eb" : "transparent",
            transition: "0.3s",
            fontWeight: "500",
          })}
        >
          <span style={{ fontSize: "18px" }}>{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}