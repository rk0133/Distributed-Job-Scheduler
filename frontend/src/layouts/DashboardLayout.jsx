import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main
          style={{
            padding: "30px",
            marginTop: "70px",
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}