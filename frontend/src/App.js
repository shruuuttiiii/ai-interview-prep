import React, { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  {
    id: 'tech',
    label: '💻 Technology',
    bg: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200")',
    roles: [
      { id: 'software', label: '💻 Software Engineer', text: '#58a6ff',
        modes: ['📝 Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design Round'] },
      { id: 'data', label: '📊 Data Scientist', text: '#64ffda',
        modes: ['📝 Technical Round', '👔 HR Round', '📊 Case Study Round', '🤖 ML Round'] },
      { id: 'ai', label: '🤖 AI/ML Engineer', text: '#ff9800',
        modes: ['🤖 ML Technical Round', '👔 HR Round', '💻 Coding Round', '📊 Research Round'] },
      { id: 'cyber', label: '🔒 Cybersecurity', text: '#f44336',
        modes: ['🔒 Technical Round', '👔 HR Round', '🛡️ Scenario Round'] },
      { id: 'mobile', label: '📱 Mobile Developer', text: '#4caf50',
        modes: ['📱 Technical Round', '👔 HR Round', '💻 Coding Round'] },
      { id: 'cloud', label: '☁️ Cloud Engineer', text: '#03a9f4',
        modes: ['☁️ Technical Round', '👔 HR Round', '🏗️ Architecture Round'] },
      { id: 'devops', label: '⚙️ DevOps Engineer', text: '#9c27b0',
        modes: ['⚙️ Technical Round', '👔 HR Round', '🔧 Practical Round'] },
      { id: 'frontend', label: '🎨 Frontend Developer', text: '#ff5722',
        modes: ['🎨 Technical Round', '👔 HR Round', '💻 Coding Round', '🖥️ UI Round'] },
      { id: 'backend', label: '🖥️ Backend Developer', text: '#607d8b',
        modes: ['🖥️ Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design'] },
      { id: 'fullstack', label: '🔥 Full Stack Developer', text: '#ffc107',
        modes: ['🔥 Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design'] },
    ]
  },
  {
    id: 'government',
    label: '🏛️ Government',
    bg: 'linear-gradient(rgba(10,20,80,0.8), rgba(10,20,80,0.8)), url("https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200")',
    roles: [
      { id: 'ssc', label: '📝 SSC CGL/CHSL', text: '#ffffff',
        modes: ['📝 General Awareness', '🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '🎤 Interview Round'] },
      { id: 'upsc', label: '🏅 UPSC / IAS', text: '#ffd700',
        modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Personality Test', '📰 Current Affairs'] },
      { id: 'banking', label: '🏦 Banking / IBPS', text: '#4fc3f7',
        modes: ['🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '💰 Banking Awareness', '🎤 Interview'] },
      { id: 'railway', label: '🚂 Railway / RRB', text: '#81c784',
        modes: ['🧮 Mathematics', '🧠 Reasoning', '📝 General Awareness', '⚙️ Technical Round'] },
      { id: 'defence', label: '🎖️ Defence / NDA', text: '#ff8a65',
        modes: ['📚 General Knowledge', '🧮 Mathematics', '🎤 SSB Interview', '🏃 Physical Round'] },
      { id: 'police', label: '👮 Police / SSB', text: '#ce93d8',
        modes: ['📝 Written Test', '🎤 Interview Round', '🧠 Psychological Test', '🏃 Physical Test'] },
      { id: 'teaching', label: '🎓 Teaching / TET', text: '#80cbc4',
        modes: ['📚 Subject Knowledge', '🎤 Demo Lesson', '👔 HR Round', '🧠 Reasoning'] },
      { id: 'psc', label: '📋 State PSC', text: '#ffcc02',
        modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Interview Round', '📰 Current Affairs'] },
    ]
  },
  {
    id: 'business',
    label: '👔 Business',
    bg: 'linear-gradient(rgba(0,50,0,0.8), rgba(0,50,0,0.8)), url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200")',
    roles: [
      { id: 'hr', label: '👔 HR Manager', text: '#ffffff',
        modes: ['👔 HR Round', '🤝 Behavioral Round', '📊 Case Study', '🎭 Role Play'] },
      { id: 'marketing', label: '📣 Marketing', text: '#ff8a65',
        modes: ['📣 Marketing Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
      { id: 'finance', label: '💰 Finance / CA', text: '#ffd54f',
        modes: ['💰 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Numerical Round'] },
      { id: 'product', label: '📦 Product Manager', text: '#80deea',
        modes: ['📦 Product Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
      { id: 'sales', label: '🛒 Sales Executive', text: '#ef9a9a',
        modes: ['🛒 Sales Round', '👔 HR Round', '🎭 Role Play', '📊 Case Study'] },
      { id: 'analyst', label: '📈 Business Analyst', text: '#b39ddb',
        modes: ['📈 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Analytical Round'] },
      { id: 'consulting', label: '🤝 Consulting', text: '#a5d6a7',
        modes: ['🤝 Case Study Round', '👔 HR Round', '📊 Analytical Round', '🎯 Strategy Round'] },
      { id: 'entrepreneur', label: '🚀 Entrepreneur', text: '#ffcc02',
        modes: ['🚀 Pitch Round', '👔 HR Round', '📊 Business Plan Round', '💡 Innovation Round'] },
    ]
  },
  {
    id: 'creative',
    label: '🎨 Creative',
    bg: 'linear-gradient(rgba(60,0,100,0.8), rgba(60,0,100,0.8)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200")',
    roles: [
      { id: 'uiux', label: '🎨 UI/UX Designer', text: '#ffffff',
        modes: ['🎨 Portfolio Review', '👔 HR Round', '🖥️ Design Challenge', '🤝 Behavioral Round'] },
      { id: 'graphic', label: '🖌️ Graphic Designer', text: '#ff80ab',
        modes: ['🖌️ Portfolio Review', '👔 HR Round', '🎨 Design Challenge'] },
      { id: 'content', label: '✍️ Content Writer', text: '#80d8ff',
        modes: ['✍️ Writing Test', '👔 HR Round', '📝 Editorial Round'] },
      { id: 'video', label: '🎬 Video Editor', text: '#ccff90',
        modes: ['🎬 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
      { id: 'animation', label: '🎭 Animator', text: '#ffd180',
        modes: ['🎭 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
      { id: 'photography', label: '📷 Photographer', text: '#ea80fc',
        modes: ['📷 Portfolio Review', '👔 HR Round', '🎨 Creative Round'] },
    ]
  },
  {
    id: 'other',
    label: '🏥 Other Fields',
    bg: 'linear-gradient(rgba(120,0,0,0.8), rgba(120,0,0,0.8)), url("https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200")',
    roles: [
      { id: 'medical', label: '🏥 Medical / Doctor', text: '#ffffff',
        modes: ['🏥 Clinical Round', '👔 HR Round', '📚 Subject Knowledge', '🎤 Viva Round'] },
      { id: 'law', label: '⚖️ Law / Legal', text: '#ffcc02',
        modes: ['⚖️ Legal Knowledge', '👔 HR Round', '📝 Case Study', '🎤 Moot Court'] },
      { id: 'civil', label: '🏗️ Civil Engineering', text: '#80cbc4',
        modes: ['🏗️ Technical Round', '👔 HR Round', '📐 Design Round'] },
      { id: 'aviation', label: '✈️ Aviation / Pilot', text: '#80d8ff',
        modes: ['✈️ Technical Round', '👔 HR Round', '🧠 Aptitude Round', '🎤 Simulator Round'] },
      { id: 'hospitality', label: '🏨 Hospitality', text: '#ffab91',
        modes: ['🏨 Service Round', '👔 HR Round', '🎭 Role Play', '🌍 Language Round'] },
      { id: 'journalism', label: '📰 Journalism', text: '#ce93d8',
        modes: ['📰 Writing Test', '👔 HR Round', '🎤 On-Air Round', '📺 Current Affairs'] },
    ]
  },
];

const BG = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200")';

function App() {
  const [authMode, setAuthMode] = useState('checking'); // checking, welcome-back, login, register
  const [savedEmail, setSavedEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [warnings, setWarnings] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (step < 3) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            setInterviewEnded(true);
            alert('🚨 Interview Terminated! You switched tabs 3 times. This is recorded.');
          } else {
            alert(`⚠️ Warning ${newCount}/3! Do not switch tabs during the interview!`);
          }
          return newCount;
        });
      }
    };

    const handleBlur = () => {
      setWarnings(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setInterviewEnded(true);
          alert('🚨 Interview Terminated! You left the window 3 times. This is recorded.');
        } else {
          alert(`⚠️ Warning ${newCount}/3! Do not leave the interview window!`);
        }
        return newCount;
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [step]);

  useEffect(() => {
    const saved = localStorage.getItem('ai_interview_email');
    if (saved) {
      setSavedEmail(saved);
      setAuthMode('welcome-back');
    } else {
      setAuthMode('register');
    }
  }, []);

  const handleRegister = () => {
    if (!email.includes('@')) return alert('Please enter a valid email!');
    if (password.length < 6) return alert('Password must be at least 6 characters!');
    if (password !== confirmPassword) return alert('Passwords do not match!');
    localStorage.setItem('ai_interview_email', email);
    localStorage.setItem('ai_interview_pass_' + email, password);
    setLoggedInEmail(email);
    setAuthMode('done');
  };

  const handleLogin = () => {
    const savedPass = localStorage.getItem('ai_interview_pass_' + savedEmail);
    if (password !== savedPass) return alert('Wrong password! Please try again.');
    setLoggedInEmail(savedEmail);
    setAuthMode('done');
  };

  const handleUseDifferentAccount = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAuthMode('register');
  };

  const handleLogout = () => {
    setLoggedInEmail('');
    setPassword('');
    setAuthMode('welcome-back');
    resetAll();
  };

  const uploadResume = async () => {
    if (!file) return alert('Please select a PDF file first!');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:8000/upload-resume', { method: 'POST', body: formData });
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
      body: JSON.stringify({ resume_text: resumeText, role: selectedRole.label, mode: selectedMode }),
    });
    const data = await response.json();
    setQuestions(data.questions);
    setStep(3);
    setLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied!');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      setLoading(true);
      const response = await fetch('http://localhost:8000/transcribe', { method: 'POST', body: formData });
      const data = await response.json();
      setTranscript(data.transcript);
      setLoading(false);
    };
  };

  const getAIFeedback = async () => {
    if (!transcript) return alert('Please record or type your answer first!');
    setLoading(true);
    const response = await fetch('http://localhost:8000/get-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: transcript, questions: questions, email: loggedInEmail, role: selectedRole.label, mode: selectedMode }),
    });
    const data = await response.json();
    setFeedback(data.feedback);
    setLoading(false);
  };

  const loadSessions = async () => {
    const response = await fetch(`http://localhost:8000/sessions?email=${loggedInEmail}`);
    const data = await response.json();
    setSessions(data);
    setShowHistory(true);
  };

  const resetAll = () => {
    setStep(1); setFile(null); setResumeText('');
    setQuestions(''); setTranscript(''); setFeedback('');
    setSelectedCategory(null); setSelectedRole(null); setSelectedMode(null);
  };

  const btnStyle = () => ({
    padding: '18px 15px',
    background: 'rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '12px', color: 'white', fontSize: '14px',
    cursor: 'pointer', backdropFilter: 'blur(10px)', textAlign: 'center',
  });

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
    fontSize: '15px', marginBottom: '12px', background: 'rgba(255,255,255,0.9)',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px',
    maxWidth: '400px', width: '100%', backdropFilter: 'blur(10px)'
  };

  // Checking localStorage
  if (authMode === 'checking') {
    return <div style={{ minHeight: '100vh', background: BG, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'white', fontSize: '18px' }}>⏳ Loading...</p>
    </div>;
  }

  // Welcome Back Screen
  if (authMode === 'welcome-back') {
    return (
      <div style={{ minHeight: '100vh', background: BG, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
        <div style={cardStyle}>
          <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Welcome Back!</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '20px' }}>Continue as:</p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
            <p style={{ color: '#64ffda', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>📧 {savedEmail}</p>
          </div>
          <input type="password" placeholder="Enter your password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={inputStyle} />
          <button onClick={handleLogin}
            style={{ width: '100%', padding: '12px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
            🚀 Login
          </button>
          <button onClick={handleUseDifferentAccount}
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
            👤 Use Different Account
          </button>
        </div>
      </div>
    );
  }

  // Register Screen
  if (authMode === 'register') {
    return (
      <div style={{ minHeight: '100vh', background: BG, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
        <div style={cardStyle}>
          <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Create Account</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>Save your progress and session history</p>
          <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Create password (min 6 chars)" value={password}
            onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Confirm password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
            style={inputStyle} />
          <button onClick={handleRegister}
            style={{ width: '100%', padding: '12px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            🚀 Create Account & Start
          </button>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>Your data is saved locally on this device</p>
        </div>
      </div>
    );
  }

  // Category Screen
  if (!selectedCategory) {
    return (
      <div style={{ minHeight: '100vh', background: BG, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={loadSessions}
            style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
            📊 My History
          </button>
          <button onClick={handleLogout}
            style={{ padding: '8px 14px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontSize: '13px' }}>👤 {loggedInEmail}</p>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '10px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', fontSize: '16px' }}>Step 1 of 3 — Choose your field</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '500px', width: '100%' }}>
          {CATEGORIES.map((cat, index) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat)}
              style={{ ...btnStyle(), gridColumn: index === 4 ? '1 / -1' : undefined, padding: '25px 20px', fontSize: '16px' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >{cat.label}</button>
          ))}
        </div>
        {showHistory && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', marginTop: '20px', maxWidth: '500px', width: '100%', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'white', margin: 0 }}>📊 My Sessions</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {sessions.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>No sessions yet!</p>
            ) : (
              sessions.map((s) => (
                <div key={s.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 3px' }}>📅 {s.created_at} | {s.role} | {s.mode}</p>
                  <p style={{ color: 'white', fontSize: '13px', margin: '0 0 3px' }}><strong>Q:</strong> {s.questions}...</p>
                  <p style={{ color: '#64ffda', fontSize: '13px', margin: 0 }}><strong>Feedback:</strong> {s.feedback}...</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Role Screen
  if (!selectedRole) {
    return (
      <div style={{ minHeight: '100vh', background: selectedCategory.bg, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 2 of 3 — Choose your role</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '25px', fontSize: '13px' }}>Field: {selectedCategory.label}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '550px', width: '100%' }}>
          {selectedCategory.roles.map((role, index) => (
            <button key={role.id} onClick={() => setSelectedRole(role)}
              style={{ ...btnStyle(), gridColumn: selectedCategory.roles.length % 2 !== 0 && index === selectedCategory.roles.length - 1 ? '1 / -1' : undefined }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >{role.label}</button>
          ))}
        </div>
        <button onClick={() => setSelectedCategory(null)}
          style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    );
  }

  // Mode Screen
  if (!selectedMode) {
    return (
      <div style={{ minHeight: '100vh', background: selectedCategory.bg, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 3 of 3 — Choose interview mode</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '25px', fontSize: '13px' }}>Role: {selectedRole.label}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '550px', width: '100%' }}>
          {selectedRole.modes.map((mode, index) => (
            <button key={index} onClick={() => setSelectedMode(mode)}
              style={{ ...btnStyle(), gridColumn: selectedRole.modes.length % 2 !== 0 && index === selectedRole.modes.length - 1 ? '1 / -1' : undefined }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >{mode}</button>
          ))}
        </div>
        <button onClick={() => setSelectedRole(null)}
          style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    );
  }

  // Main Interview Screen
  return (
    <div style={{ minHeight: '100vh', background: selectedCategory.bg, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: '20px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>🤖 AI Interview Prep</h1>
            <p style={{ color: selectedRole.text, margin: '3px 0', fontSize: '13px' }}>👤 {loggedInEmail} | {selectedRole.label} | {selectedMode}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={loadSessions} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>📊 History</button>
            <button onClick={resetAll} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>🔄 Restart</button>
            <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>🚪 Logout</button>
          </div>
        </div>

        {showHistory && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'white', margin: 0 }}>📊 My Session History</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {sessions.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.7)' }}>No sessions yet!</p> : sessions.map((s) => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 3px' }}>📅 {s.created_at} | {s.role} | {s.mode}</p>
                <p style={{ color: 'white', fontSize: '13px', margin: '0 0 3px' }}><strong>Q:</strong> {s.questions}...</p>
                <p style={{ color: selectedRole.text, fontSize: '13px', margin: 0 }}><strong>Feedback:</strong> {s.feedback}...</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: 'white', marginTop: 0 }}>📄 Step 1 — Upload Your Resume</h3>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '10px 0', color: 'white' }} />
          <br />
          <button onClick={uploadResume} disabled={loading}
            style={{ marginTop: '10px', padding: '10px 25px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
            {loading ? '⏳ Reading...' : '📤 Upload Resume'}
          </button>
        </div>

        {step >= 2 && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>✅ Resume Uploaded!</h3>
            <button onClick={generateQuestions} disabled={loading}
              style={{ padding: '10px 25px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              {loading ? '⏳ Generating...' : `🤖 Generate ${selectedMode} Questions`}
            </button>
          </div>
        )}
        {step >= 3 && warnings > 0 && (
          <div style={{ background: 'rgba(255,0,0,0.3)', padding: '12px 20px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <p style={{ color: 'white', margin: 0, fontSize: '14px' }}>
              <strong>Warning {warnings}/3</strong> — Do not switch tabs or leave this window during the interview!
            </p>
          </div>
        )}

        {interviewEnded && (
          <div style={{ background: 'rgba(255,0,0,0.5)', padding: '25px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: 'white', marginTop: 0 }}>🚨 Interview Terminated!</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>You switched tabs/windows 3 times. This behavior has been recorded.</p>
            <button onClick={() => { resetAll(); setWarnings(0); setInterviewEnded(false); }}
              style={{ padding: '10px 25px', background: 'white', color: '#c00', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
              🔄 Start Over
            </button>
          </div>
        )}

        {step >= 3 && (
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>🎯 {selectedMode} Questions</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>{questions}</pre>
            <h3 style={{ color: 'white' }}>🎙️ Record Your Answer</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Works on ALL browsers!</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button onClick={startRecording} disabled={isRecording}
                style={{ padding: '10px 20px', background: isRecording ? '#555' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {isRecording ? '🔴 Recording...' : '🔴 Start Recording'}
              </button>
              <button onClick={stopRecording} disabled={!isRecording}
                style={{ padding: '10px 20px', background: !isRecording ? '#555' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ⏹️ Stop & Transcribe
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Or type your answer:</p>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)}
              placeholder="Speak or type your answer here..."
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,255,255,0.9)' }} />
            {loading && <p style={{ color: selectedRole.text }}>⏳ Processing...</p>}
            <button onClick={getAIFeedback} disabled={loading || !transcript}
              style={{ padding: '10px 25px', background: '#7B1FA2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
              {loading ? '⏳ Analyzing...' : '📊 Get AI Feedback & Score'}
            </button>
          </div>
        )}

        {feedback && (
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>📊 AI Feedback</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>{feedback}</pre>
            <button onClick={resetAll}
              style={{ marginTop: '15px', padding: '10px 25px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              🔄 Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;