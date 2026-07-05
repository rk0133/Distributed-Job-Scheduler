export default function MetricCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "22px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 15px 30px rgba(0,0,0,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,.08)";
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "18px",
          marginBottom: "10px",
          color,
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>

      <div
        style={{
          height: "6px",
          width: "100%",
          borderRadius: "10px",
          background: "#eef2ff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "75%",
            height: "100%",
            background: color,
          }}
        />
      </div>
    </div>
  );
}