const matchJob = (req, res) => {
  const { resumeSkills, jobSkills } = req.body;

  const flatResumeSkills = resumeSkills.flat();

  const normalizedResumeSkills = flatResumeSkills.map((skill) => {
    if (skill === "OOP") return "Object-Oriented Programming";
    return skill;
  });

  const matchedSkills = normalizedResumeSkills.filter((skill) =>
    jobSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(
    (skill) => !normalizedResumeSkills.includes(skill)
  );

  const matchPercentage =
    (matchedSkills.length / jobSkills.length) * 100;

  res.json({
    matchPercentage: Number(matchPercentage.toFixed(2)),
    matchedSkills,
    missingSkills,
  });
};

module.exports = { matchJob };