import { useState } from "react";
import { generateCoverLetter } from "../services/api";
import '../styles/main.css'
import { downloadDocx } from "../utils/downloadDocs";
import { extractTextFromPDF } from "../utils/extractPdf";


export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateCoverLetter(jobDescription, resumeText);
      setResult(data.cover_letter);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setFileName(file.name); 
  let text = "";

  if (file.type === "application/pdf") {
    text = await extractTextFromPDF(file);
  }  
  else {
    alert("Only PDF Files allowed");
    return;
  }
  setResumeText(text);
};

return (
  <div className="container">
    <h1>ApplyAI</h1>

<p className="description">
  Paste the job description and your LinkedIn summary to generate a professional cover letter based on your real experience.
</p>

    <div className="card">
      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

    <br />
    <br />
      
    <div className="file-upload">
    <label htmlFor="fileInput" className="file-label">
     Upload CV (PDF Only)
    </label>

  <input
    id="fileInput"
    type="file"
    accept=".pdf,.docx"
    onChange={handleFileUpload}
  />

   {fileName && (
    <p className="file-name">
    📄 {fileName}
    </p>
  )}

  {resumeText && (
    <p className="file-success">✅ Resume uploaded successfully</p>
  )}
</div>
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>
    </div>

    {result && (
      <div className="card result">

        <div className="result-header">
        <h2>Result</h2>
        <button onClick={() => downloadDocx(result)}>
            Download as Word
        </button>
        </div>
        <p style={{ whiteSpace: "pre-line" }}>{result}</p>
      </div>
    )}
  </div>
);
}