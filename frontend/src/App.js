import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
      };
    }
  }, []);

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

  const startRecording = () => {
    setTranscript('');
    setFeedback('');
    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  const getAIFeedback = async () => {
    if (!transcript) return alert('Please record your answer first!');
    setLoading(true);
    const response = await fetch('http://localhost:8000/get-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: transcript, questions: questions }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
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
        <button onClick={uploadResume} disabled={loading}
          style={{ padding: '10px 25px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
          {loading ? '⏳ Reading...' : '📤 Upload Resume'}
        </button>
      </div>

      {/* Step 2 - Generate Questions */}
      {step >= 2 && (
        <div style={{ background: '#e6f4ea', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
          <h3>✅ Resume Uploaded!</h3>
          <button onClick={generateQuestions} disabled={loading}
            style={{ padding: '10px 25px', background: '#1a7f37', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
            {loading ? '⏳ Generating...' : '🤖 Generate Interview Questions'}
          </button>
        </div>
      )}

      {/* Step 3 - Questions + Voice */}
      {step >= 3 && (
        <div style={{ background: '#fff8e1', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
          <h3>🎯 Your Interview Questions</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8' }}>{questions}</pre>

          <h3 style={{ marginTop: '20px' }}>🎙️ Record Your Answer</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button onClick={startRecording} disabled={isRecording}
              style={{ padding: '10px 20px', background: isRecording ? '#ccc' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              🔴 Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}
              style={{ padding: '10px 20px', background: !isRecording ? '#ccc' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              ⏹️ Stop Recording
            </button>
          </div>
          <p style={{fontSize:'13px', color:'gray', marginTop:'10px'}}>Or type your answer below:</p>
<textarea
  value={transcript}
  onChange={(e) => setTranscript(e.target.value)}
  placeholder="Speak or type your answer here..."
  style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', marginBottom: '15px' }}
/>

          {transcript && (
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>Your Answer:</strong>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>{transcript}</p>
            </div>
          )}

          <button onClick={getAIFeedback} disabled={loading || !transcript}
            style={{ padding: '10px 25px', background: '#7B1FA2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
            {loading ? '⏳ Analyzing...' : '📊 Get AI Feedback & Score'}
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{ background: '#e8eaf6', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
          <h3>📊 AI Feedback</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8' }}>{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default App;