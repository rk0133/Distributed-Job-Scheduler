import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "240px",
        right: 0,
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        zIndex: 100,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#2563eb",
            fontWeight: "700",
          }}
        >
          Distributed Job Scheduler
        </h2>

        <small style={{ color: "#666" }}>
          {today}
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell
          size={20}
          color="#555"
          style={{ cursor: "pointer" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle
            size={34}
            color="#2563eb"
          />

          <div>
            <strong>Administrator</strong>

            <br />

            <small style={{ color: "#777" }}>
              Online
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}