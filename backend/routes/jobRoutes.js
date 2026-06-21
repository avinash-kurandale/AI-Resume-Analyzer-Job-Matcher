const express = require("express");
const router = express.Router();

const { matchJob } = require("../controllers/jobController");

router.post("/match-job", matchJob);

module.exports = router;