const fs = require("fs");
const pdfParse = require("pdf-parse");

const {
  getResumeSuggestions,
} = require("../services/geminiService");

const analyzeResume = async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(pdfBuffer);

    const suggestions =
      await getResumeSuggestions(data.text);

    res.json({
        message: "Resume analyzed successfully",
        suggestions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error analyzing resume",
    });
  }
};

module.exports = { analyzeResume };