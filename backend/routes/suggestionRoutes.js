const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

const {
  analyzeResume,
} = require("../controllers/suggestionController");

router.post(
  "/resume-suggestions",
  upload.single("resume"),
  analyzeResume
);

module.exports = router;