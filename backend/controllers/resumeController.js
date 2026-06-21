const fs = require("fs");
const pdfParse = require("pdf-parse");

const { extractSkills } =
require("../services/geminiService");

const uploadResume = async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(pdfBuffer);

const skills = await extractSkills(data.text);

    res.json({
    message: "Resume processed successfully",
    skills,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error processing resume",
    });
  }
};

module.exports = { uploadResume };