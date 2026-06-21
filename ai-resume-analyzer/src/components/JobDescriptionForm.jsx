function JobDescriptionForm({
  jobDescription,
  setJobDescription,
}) {
  return (
    <div>
      <h3>Job Description</h3>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
      />
    </div>
  );
}

export default JobDescriptionForm;