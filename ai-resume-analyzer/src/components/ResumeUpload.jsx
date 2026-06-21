function ResumeUpload({ setResume }) {
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div>
      <h3>Upload Resume</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ResumeUpload;