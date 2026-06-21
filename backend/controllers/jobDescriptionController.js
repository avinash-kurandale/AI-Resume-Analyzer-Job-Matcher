const {
  extractJobSkills,
} = require("../services/geminiService");

const analyzeJobDescription = async (
  req,
  res
) => {
  try {
    const {
      resumeSkills,
      jobDescription,
    } = req.body;

    const jobSkills =
      await extractJobSkills(jobDescription);

    const normalizedJobSkills =
      jobSkills.map((skill) =>
        typeof skill === "object"
          ? skill.name
          : skill
      );

    const flatResumeSkills =
      resumeSkills.flat();

    const normalizedResumeSkills =
      flatResumeSkills.map((skill) => {
        if (skill === "OOP")
          return "Object-Oriented Programming";
        return skill;
      });

    // Upgraded helper function to normalize variations in skill strings
    const normalizeSkill = (skill) =>
      skill
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/[\s()-]/g, "")
        .replace("html5", "html")
        .replace("css3", "css")
        .replace("reactjs", "react")
        .replace("objectorientedprogrammingoop", "oop")
        .replace("objectorientedprogramming", "oop");

    // Filter using the normalized arrays to find matching skills
    const matchedSkills = normalizedResumeSkills.filter(
      (resumeSkill) =>
        normalizedJobSkills.some(
          (jobSkill) =>
            normalizeSkill(resumeSkill) ===
            normalizeSkill(jobSkill)
        )
    );

    // Filter using the normalized arrays to pinpoint missing skills
    const missingSkills = normalizedJobSkills.filter(
      (jobSkill) =>
        !normalizedResumeSkills.some(
          (resumeSkill) =>
            normalizeSkill(resumeSkill) ===
            normalizeSkill(jobSkill)
        )
    );

    const matchPercentage =
      (matchedSkills.length /
        normalizedJobSkills.length) *
      100;

    res.json({
      matchPercentage: Number(
        matchPercentage.toFixed(2)
      ),
      matchedSkills,
      missingSkills,
      extractedJobSkills:
        normalizedJobSkills,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Error analyzing job description",
    });
  }
};

module.exports = {
  analyzeJobDescription,
};