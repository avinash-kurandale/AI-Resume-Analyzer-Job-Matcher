import { useState } from "react";
import API from "../services/api";

function JobMatcher() {
  const [resumeSkills, setResumeSkills] = useState("");
  const [jobSkills, setJobSkills] = useState("");

  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    try {
      const response = await API.post("/match-job", {
        resumeSkills: resumeSkills.split(","),
        jobSkills: jobSkills.split(","),
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Matching failed");
    }
  };

  return (
    <div>
      <h1>Job Matcher</h1>

      <h3>Resume Skills</h3>

      <textarea
        rows="5"
        cols="50"
        placeholder="Java, React.js, Node.js, MongoDB"
        value={resumeSkills}
        onChange={(e) =>
          setResumeSkills(e.target.value)
        }
      />

      <br />
      <br />

      <h3>Job Skills</h3>

      <textarea
        rows="5"
        cols="50"
        placeholder="Java, React.js, AWS, Docker"
        value={jobSkills}
        onChange={(e) =>
          setJobSkills(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleMatch}>
        Match Job
      </button>

      {result && (
        <>
          <h2>
            Match Percentage:
            {" "}
            {result.matchPercentage}%
          </h2>

          <h3>Matched Skills</h3>

          <ul>
            {result.matchedSkills.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Missing Skills</h3>

          <ul>
            {result.missingSkills.map(
              (skill, index) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default JobMatcher;