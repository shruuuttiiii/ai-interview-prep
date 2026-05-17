import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const uploadResume = async () => {
    if (!file) return alert('Please select a PDF file first!');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:8000/upload-resume', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResumeText(data.full_text);
    setStep(2);
    setLoading(false);
  };

  const generateQuestions = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText }),
    });
    const data = await response.json();
    setQuestions(data.questions);
    setStep(3);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h1>🤖 AI Interview Prep Platform</h1>
      <p style={{ color: 'gray' }}>Your personal AI-powered interview coach</p>

      {/* Step 1 - Upload Resume */}
      <div style={{ background: '#f5f5f5', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
        <h3>📄 Step 1 — Upload Your Resume</h3>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '15px 0' }} />
        <br />
        <button
          onClick={uploadResume}
          disabled={loading}
          style={{ padding: '10px 25px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}
        >
          {loading ? '⏳ Reading Resume...' : '📤 Upload Resume'}
        </button>
      </div>

      {/* Step 2 - Generate Questions */}
      {step >= 2 && (
        <div style={{ background: '#e6f4ea', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
          <h3>✅ Resume Uploaded Successfully!</h3>
          <p style={{ color: '#333', fontSize: '13px' }}><strong>Preview:</strong> {resumeText.slice(0, 200)}...</p>
          <button
            onClick={generateQuestions}
            disabled={loading}
            style={{ padding: '10px 25px', background: '#1a7f37', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', marginTop: '10px' }}
          >
            {loading ? '⏳ AI Generating Questions...' : '🤖 Generate Interview Questions'}
          </button>
        </div>
      )}

      {/* Step 3 - Show Questions */}
      {step >= 3 && (
        <div style={{ background: '#fff8e1', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
          <h3>🎯 Your Personalized Interview Questions</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8', color: '#333' }}>
            {questions}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;