const express = require("express");
const router = express.Router();

const {
  analyzeJobDescription,
} = require("../controllers/jobDescriptionController");

router.post(
  "/match-job-description",
  analyzeJobDescription
);

module.exports = router;