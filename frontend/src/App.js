import React, { useState } from "react";

// Modern, high-impact styles defined in a JS object for portability
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    backgroundImage: `radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%), 
                      radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)`,
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#f8fafc",
    margin: 0,
    padding: "20px",
  },
  card: {
    background: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    padding: "3rem",
    width: "100%",
    maxWidth: "550px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "1rem",
    background: "linear-gradient(to right, #38bdf8, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.025em",
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    background: "rgba(34, 197, 94, 0.1)",
    color: "#4ade80",
    borderRadius: "100px",
    fontSize: "0.85rem",
    fontWeight: "600",
    marginBottom: "2rem",
    border: "1px solid rgba(74, 222, 128, 0.2)",
  },
  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
  },
  pre: {
    marginTop: "2rem",
    background: "rgba(15, 23, 42, 0.5)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
    fontSize: "0.9rem",
    fontFamily: "'Fira Code', monospace",
    color: "#94a3b8",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    maxHeight: "250px",
    overflowY: "auto",
    lineHeight: "1.5",
  }
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulating network delay for that premium feel
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await fetch("/api/data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      setData({ error: "Service currently unavailable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.status}>
          <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%" }} />
          Network Status: Online
        </div>
        
        <h1 style={styles.title}>Microservices <br/> Control Plane</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Monitor and fetch real-time data streams across your distributed architecture.
        </p>

        <button 
          onClick={fetchData} 
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.filter = "brightness(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.filter = "brightness(1)"}
        >
          {loading ? "Establishing Connection..." : "Sync Microservices 🚀"}
        </button>

        {data && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <pre style={styles.pre}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;