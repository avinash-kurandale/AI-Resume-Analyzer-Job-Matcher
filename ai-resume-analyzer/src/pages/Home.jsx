import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      {/* Hero Badge */}
      <div 
        style={{
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          padding: "6px 16px",
          borderRadius: "9999px",
          fontSize: "0.85rem",
          fontWeight: "600",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}
      >
        Next-Gen ATS Optimization
      </div>

      {/* Hero Header */}
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "20px",
          letterSpacing: "-0.03em",
          lineHeight: "1.15",
          maxWidth: "800px"
        }}
      >
        AI-Powered Resume Analyzer <br />
        <span style={{ color: "#3b82f6" }}>& Intelligent Job Matcher</span>
      </h1>

      {/* Hero Subtitle */}
      <p 
        style={{ 
          color: "#64748b", 
          fontSize: "1.2rem", 
          lineHeight: "1.6",
          maxWidth: "600px",
          marginBottom: "40px" 
        }}
      >
        Extract core technical competencies, receive structural AI suggestions, and cross-reference your resume profile against target job descriptions in real-time.
      </p>

      {/* Main Call to Action Area */}
      <div 
        style={{ 
          display: "flex", 
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <Link to="/resume-analyzer" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "14px 32px",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "transform 0.2s ease, background-color 0.2s ease",
              boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
          >
            Launch Core Workspace
          </button>
        </Link>
      </div>

      {/* Subtle Feature Trust Footer */}
      <div 
        style={{ 
          marginTop: "80px", 
          borderTop: "1px solid #e2e8f0", 
          paddingTop: "30px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "space-around",
          color: "#94a3b8",
          fontSize: "0.85rem",
          fontWeight: "500"
        }}
      >
        <div>✦ Advanced PDF Parsing</div>
        <div>✦ Deep Semantic Extraction</div>
        <div>✦ Instant ATS Scoring</div>
      </div>
    </div>
  );
}

export default Home;