import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const testBackend = async () => {
    const response = await fetch('http://localhost:8000');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '80px' }}>
      <h1>🤖 AI Interview Prep Platform</h1>
      <p style={{ color: 'gray' }}>Your personal AI-powered interview coach</p>

      <button
        onClick={testBackend}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          background: '#185FA5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Backend Connection
      </button>

      {message && (
        <div style={{
          marginTop: '30px',
          padding: '16px',
          background: '#e6f4ea',
          borderRadius: '8px',
          display: 'inline-block',
          color: '#1a7f37',
          fontWeight: 'bold'
        }}>
          ✅ Backend says: {message}
        </div>
      )}
    </div>
  );
}

export default App;
