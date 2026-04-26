import { useState } from "react";
import { generateCoverLetter } from "../services/api";
import '../styles/main.css'
import { downloadDocx } from "../utils/downloadDocs";
export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [linkedIn_summary, setLinkedInSummary] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateCoverLetter(jobDescription, linkedIn_summary);
      setResult(data.cover_letter);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
      <textarea type="text" placeholder="LinkedIn profile Summary" 
       value={linkedIn_summary}
       onChange={(e) => setLinkedInSummary(e.target.value)}
      />

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