const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ----------------------------
// Resume Skill Extraction
// ----------------------------
async function extractSkills(resumeText) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Extract all technical skills from this resume.

Rules:
- Return ONLY a JSON array.
- No explanations.
- No markdown.
- No \`\`\`json blocks.

Resume:
${resumeText}
`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const content = completion.choices[0].message.content;

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Skill Extraction Error:", error);
    throw error;
  }
}

// ----------------------------
// Resume Suggestions
// ----------------------------
async function getResumeSuggestions(resumeText) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Analyze this resume and provide exactly 5 improvement suggestions.

Return ONLY a JSON array.

Example:
[
  "Suggestion 1",
  "Suggestion 2",
  "Suggestion 3",
  "Suggestion 4",
  "Suggestion 5"
]

Resume:
${resumeText}
`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const content = completion.choices[0].message.content;

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(cleaned);

    return cleaned;
  } catch (error) {
    console.error("Resume Suggestion Error:", error);
    throw error;
  }
}

// ----------------------------
// Job Description Skill Extraction
// ----------------------------
async function extractJobSkills(jobDescription) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Extract only technical skills from the following job description.

Return ONLY a JSON array.

Example:
[
  "React.js",
  "Node.js",
  "MongoDB",
  "Git",
  "Docker"
]

Job Description:
${jobDescription}
`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const content = completion.choices[0].message.content;

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Extracted Job Skills:");
    console.log(cleaned);

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Job Skill Extraction Error:", error);
    throw error;
  }
}

module.exports = {
  extractSkills,
  getResumeSuggestions,
  extractJobSkills,
};