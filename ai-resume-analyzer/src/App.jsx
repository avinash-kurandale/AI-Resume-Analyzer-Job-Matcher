import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobMatcher from "./pages/JobMatcher";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/job-matcher" element={<JobMatcher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;