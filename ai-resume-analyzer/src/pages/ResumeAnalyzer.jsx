import { useState } from "react";
import API from "../services/api";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData1 = new FormData();
    formData1.append("resume", file);

    const formData2 = new FormData();
    formData2.append("resume", file);

    try {
      setLoading(true);

      const resumeResponse = await API.post(
        "/upload-resume",
        formData1
      );

      setSkills(
        Array.isArray(resumeResponse.data.skills)
          ? resumeResponse.data.skills
          : []
      );

      const suggestionResponse = await API.post(
        "/resume-suggestions",
        formData2
      );

      setSuggestions(
        suggestionResponse.data.suggestions || ""
      );

      setMatchResult(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description");
      return;
    }

    try {
      const response = await API.post(
        "/match-job-description",
        {
          resumeSkills: skills,
          jobDescription,
        }
      );

      setMatchResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Matching failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <header style={{ textAlign: "center", marginBottom: "40px", paddingTop: "20px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "10px",
            letterSpacing: "-0.025em",
          }}
        >
          AI Resume Analyzer <span style={{ color: "#3b82f6" }}>& Job Matcher</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Optimize your resume and benchmark your skills against any technical job description instantly.
        </p>
      </header>

      {/* Main Workspace Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
        
        {/* LEFT COLUMN: Input Control Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Step 1: Upload Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: 0, marginBottom: "8px", color: "#1e293b" }}>
              1. Upload Your Resume
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "20px" }}>
              Select your master technical resume in PDF format to extract core skill sets.
            </p>
            
            <div 
              style={{
                border: "2px dashed #cbd5e1",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  fontSize: "0.9rem",
                  color: "#475569",
                  cursor: "pointer",
                  width: "100%"
                }}
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 24px",
                backgroundColor: loading ? "#93c5fd" : "#3b82f6",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "0.95rem",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
              }}
            >
              {loading ? "Processing Document..." : "Analyze & Extract Skills"}
            </button>
          </div>

          {/* Step 2: Job Description Matcher Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: 0, marginBottom: "8px", color: "#1e293b" }}>
              2. Target Job Profile
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "16px" }}>
              Paste the entire role specifications below to run cross-matching algorithms.
            </p>

            <textarea
              rows="12"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box",
                outline: "none",
                backgroundColor: "#f8fafc",
                color: "#334155"
              }}
              placeholder="Paste complete job description requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              onClick={handleMatch}
              disabled={skills.length === 0}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "12px 24px",
                backgroundColor: skills.length === 0 ? "#cbd5e1" : "#10b981",
                color: skills.length === 0 ? "#64748b" : "#ffffff",
                fontWeight: "600",
                fontSize: "0.95rem",
                border: "none",
                borderRadius: "10px",
                cursor: skills.length === 0 ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease",
                boxShadow: skills.length === 0 ? "none" : "0 4px 12px rgba(16, 185, 129, 0.25)"
              }}
            >
              {skills.length === 0 ? "Extract Resume Skills First" : "Evaluate Job Alignment"}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Output Analytics Display */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Loading Indicator Spinner Area */}
          {loading && (
            <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "16px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <div style={{ inlineSize: "40px", blockSize: "40px", border: "4px solid #f3f3f3", borderTop: "4px solid #3b82f6", borderRadius: "50%", margin: "0 auto 15px auto", animation: "spin 1s linear infinite" }}></div>
              <h3 style={{ margin: 0, color: "#475569", fontWeight: "600" }}>Parsing Resume Structure...</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "5px" }}>AI is mapping domain intelligence metadata.</p>
            </div>
          )}

          {/* Extracted Skills Section */}
          {skills.length > 0 && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0, marginBottom: "15px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Identified Core Competencies
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#f1f5f9",
                      color: "#334155",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      border: "1px solid #e2e8f0"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Match Analytics Output Dashboard */}
          {matchResult && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Match Report
                </h3>
                <span 
                  style={{ 
                    fontSize: "1.75rem", 
                    fontWeight: "800", 
                    color: matchResult.matchPercentage >= 70 ? "#10b981" : matchResult.matchPercentage >= 40 ? "#f59e0b" : "#ef4444" 
                  }}
                >
                  {matchResult.matchPercentage}%
                </span>
              </div>

              {/* Progress Tracking Metric Bar */}
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    width: `${matchResult.matchPercentage}%`,
                    height: "100%",
                    backgroundColor: matchResult.matchPercentage >= 70 ? "#10b981" : matchResult.matchPercentage >= 40 ? "#f59e0b" : "#ef4444",
                    borderRadius: "9999px",
                    transition: "width 0.5s ease-out"
                  }}
                />
              </div>

              {/* Verified Matched Skills */}
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e293b", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#10b981" }}>✓</span> Matched Skills Matching Requirements
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "25px" }}>
                {matchResult.matchedSkills?.length > 0 ? (
                  matchResult.matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#ecfdf5",
                        color: "#065f46",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        border: "1px solid #a7f3d0"
                      }}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8", italic: "true" }}>No intersecting technical keywords detected.</span>
                )}
              </div>

              {/* Identified Resource Gaps */}
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e293b", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#ef4444" }}>⚡</span> Missing Critical Requirements
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "25px" }}>
                {matchResult.missingSkills?.length > 0 ? (
                  matchResult.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#fef2f2",
                        color: "#991b1b",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        border: "1px solid #fee2e2"
                      }}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: "0.85rem", color: "#10b981" }}>Perfect technical cross-coverage achieved!</span>
                )}
              </div>

              {/* Total Job Scope Parameters */}
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e293b", marginBottom: "10px" }}>
                Target Keywords Discovered in Scope
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {matchResult.extractedJobSkills?.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#fffbeb",
                      color: "#92400e",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      border: "1px solid #fef3c7"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Strategy & Formulating Recommendations Panel */}
          {suggestions && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0, marginBottom: "15px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                AI Strategic Optimization Insights
              </h3>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  color: "#334155",
                  margin: 0,
                  backgroundColor: "#fafafa",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0"
                }}
              >
                {suggestions}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ResumeAnalyzer;