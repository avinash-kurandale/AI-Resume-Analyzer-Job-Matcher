const express = require("express");
const cors = require("cors");
require("dotenv").config();


const upload = require("./middleware/upload");
const { uploadResume } = require("./controllers/resumeController");

const jobRoutes = require("./routes/jobRoutes");
const suggestionRoutes =
require("./routes/suggestionRoutes");

const jobDescriptionRoutes =
require("./routes/jobDescriptionRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/", jobRoutes);
app.use("/", suggestionRoutes);
app.use("/", jobDescriptionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post(
  "/upload-resume",
  upload.single("resume"),
  uploadResume
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});