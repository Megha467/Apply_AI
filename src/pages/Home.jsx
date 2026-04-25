import { useState } from "react";
import { generateCoverLetter } from "../services/api";
import '../styles/main.css'
import { downloadDocx } from "../utils/downloadDocs";
export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateCoverLetter(jobDescription);
      setResult(data.cover_letter);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

return (
  <div className="container">
    <h1>ApplyAI</h1>

    <div className="card">
      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
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