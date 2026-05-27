import React, { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  {
    id: 'tech', label: '💻 Technology',
    bg: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200")',
    roles: [
      { id: 'software', label: '💻 Software Engineer', text: '#58a6ff', modes: ['📝 Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design Round'] },
      { id: 'data', label: '📊 Data Scientist', text: '#64ffda', modes: ['📝 Technical Round', '👔 HR Round', '📊 Case Study Round', '🤖 ML Round'] },
      { id: 'ai', label: '🤖 AI/ML Engineer', text: '#ff9800', modes: ['🤖 ML Technical Round', '👔 HR Round', '💻 Coding Round', '📊 Research Round'] },
      { id: 'cyber', label: '🔒 Cybersecurity', text: '#f44336', modes: ['🔒 Technical Round', '👔 HR Round', '🛡️ Scenario Round'] },
      { id: 'mobile', label: '📱 Mobile Developer', text: '#4caf50', modes: ['📱 Technical Round', '👔 HR Round', '💻 Coding Round'] },
      { id: 'cloud', label: '☁️ Cloud Engineer', text: '#03a9f4', modes: ['☁️ Technical Round', '👔 HR Round', '🏗️ Architecture Round'] },
      { id: 'devops', label: '⚙️ DevOps Engineer', text: '#9c27b0', modes: ['⚙️ Technical Round', '👔 HR Round', '🔧 Practical Round'] },
      { id: 'frontend', label: '🎨 Frontend Developer', text: '#ff5722', modes: ['🎨 Technical Round', '👔 HR Round', '💻 Coding Round', '🖥️ UI Round'] },
      { id: 'backend', label: '🖥️ Backend Developer', text: '#607d8b', modes: ['🖥️ Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design'] },
      { id: 'fullstack', label: '🔥 Full Stack Developer', text: '#ffc107', modes: ['🔥 Technical Round', '👔 HR Round', '💻 Coding Round', '🏗️ System Design'] },
    ]
  },
  {
    id: 'government', label: '🏛️ Government',
    bg: 'linear-gradient(rgba(10,20,80,0.8), rgba(10,20,80,0.8)), url("https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200")',
    roles: [
      { id: 'ssc', label: '📝 SSC CGL/CHSL', text: '#ffffff', modes: ['📝 General Awareness', '🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '🎤 Interview Round'] },
      { id: 'upsc', label: '🏅 UPSC / IAS', text: '#ffd700', modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Personality Test', '📰 Current Affairs'] },
      { id: 'banking', label: '🏦 Banking / IBPS', text: '#4fc3f7', modes: ['🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '💰 Banking Awareness', '🎤 Interview'] },
      { id: 'railway', label: '🚂 Railway / RRB', text: '#81c784', modes: ['🧮 Mathematics', '🧠 Reasoning', '📝 General Awareness', '⚙️ Technical Round'] },
      { id: 'defence', label: '🎖️ Defence / NDA', text: '#ff8a65', modes: ['📚 General Knowledge', '🧮 Mathematics', '🎤 SSB Interview', '🏃 Physical Round'] },
      { id: 'police', label: '👮 Police / SSB', text: '#ce93d8', modes: ['📝 Written Test', '🎤 Interview Round', '🧠 Psychological Test', '🏃 Physical Test'] },
      { id: 'teaching', label: '🎓 Teaching / TET', text: '#80cbc4', modes: ['📚 Subject Knowledge', '🎤 Demo Lesson', '👔 HR Round', '🧠 Reasoning'] },
      { id: 'psc', label: '📋 State PSC', text: '#ffcc02', modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Interview Round', '📰 Current Affairs'] },
    ]
  },
  {
    id: 'business', label: '👔 Business',
    bg: 'linear-gradient(rgba(0,50,0,0.8), rgba(0,50,0,0.8)), url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200")',
    roles: [
      { id: 'hr', label: '👔 HR Manager', text: '#ffffff', modes: ['👔 HR Round', '🤝 Behavioral Round', '📊 Case Study', '🎭 Role Play'] },
      { id: 'marketing', label: '📣 Marketing', text: '#ff8a65', modes: ['📣 Marketing Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
      { id: 'finance', label: '💰 Finance / CA', text: '#ffd54f', modes: ['💰 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Numerical Round'] },
      { id: 'product', label: '📦 Product Manager', text: '#80deea', modes: ['📦 Product Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
      { id: 'sales', label: '🛒 Sales Executive', text: '#ef9a9a', modes: ['🛒 Sales Round', '👔 HR Round', '🎭 Role Play', '📊 Case Study'] },
      { id: 'analyst', label: '📈 Business Analyst', text: '#b39ddb', modes: ['📈 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Analytical Round'] },
      { id: 'consulting', label: '🤝 Consulting', text: '#a5d6a7', modes: ['🤝 Case Study Round', '👔 HR Round', '📊 Analytical Round', '🎯 Strategy Round'] },
      { id: 'entrepreneur', label: '🚀 Entrepreneur', text: '#ffcc02', modes: ['🚀 Pitch Round', '👔 HR Round', '📊 Business Plan Round', '💡 Innovation Round'] },
    ]
  },
  {
    id: 'creative', label: '🎨 Creative',
    bg: 'linear-gradient(rgba(60,0,100,0.8), rgba(60,0,100,0.8)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200")',
    roles: [
      { id: 'uiux', label: '🎨 UI/UX Designer', text: '#ffffff', modes: ['🎨 Portfolio Review', '👔 HR Round', '🖥️ Design Challenge', '🤝 Behavioral Round'] },
      { id: 'graphic', label: '🖌️ Graphic Designer', text: '#ff80ab', modes: ['🖌️ Portfolio Review', '👔 HR Round', '🎨 Design Challenge'] },
      { id: 'content', label: '✍️ Content Writer', text: '#80d8ff', modes: ['✍️ Writing Test', '👔 HR Round', '📝 Editorial Round'] },
      { id: 'video', label: '🎬 Video Editor', text: '#ccff90', modes: ['🎬 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
      { id: 'animation', label: '🎭 Animator', text: '#ffd180', modes: ['🎭 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
      { id: 'photography', label: '📷 Photographer', text: '#ea80fc', modes: ['📷 Portfolio Review', '👔 HR Round', '🎨 Creative Round'] },
    ]
  },
  {
    id: 'other', label: '🏥 Other Fields',
    bg: 'linear-gradient(rgba(120,0,0,0.8), rgba(120,0,0,0.8)), url("https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200")',
    roles: [
      { id: 'medical', label: '🏥 Medical / Doctor', text: '#ffffff', modes: ['🏥 Clinical Round', '👔 HR Round', '📚 Subject Knowledge', '🎤 Viva Round'] },
      { id: 'law', label: '⚖️ Law / Legal', text: '#ffcc02', modes: ['⚖️ Legal Knowledge', '👔 HR Round', '📝 Case Study', '🎤 Moot Court'] },
      { id: 'civil', label: '🏗️ Civil Engineering', text: '#80cbc4', modes: ['🏗️ Technical Round', '👔 HR Round', '📐 Design Round'] },
      { id: 'aviation', label: '✈️ Aviation / Pilot', text: '#80d8ff', modes: ['✈️ Technical Round', '👔 HR Round', '🧠 Aptitude Round', '🎤 Simulator Round'] },
      { id: 'hospitality', label: '🏨 Hospitality', text: '#ffab91', modes: ['🏨 Service Round', '👔 HR Round', '🎭 Role Play', '🌍 Language Round'] },
      { id: 'journalism', label: '📰 Journalism', text: '#ce93d8', modes: ['📰 Writing Test', '👔 HR Round', '🎤 On-Air Round', '📺 Current Affairs'] },
    ]
  },
];

const BG = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200")';
const isMobile = window.innerWidth <= 600;

function App() {
  const [authMode, setAuthMode] = useState('checking');
  const [savedEmail, setSavedEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [language, setLanguage] = useState('English');
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [idealAnswer, setIdealAnswer] = useState('');
  const [showIdeal, setShowIdeal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [warnings, setWarnings] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [panelMode, setPanelMode] = useState(false);
  const [panelQuestions, setPanelQuestions] = useState('');
  const [panelFeedback, setPanelFeedback] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const saved = localStorage.getItem('ai_interview_email');
    if (saved) { setSavedEmail(saved); setAuthMode('welcome-back'); }
    else { setAuthMode('register'); }
  }, []);

  useEffect(() => {
    if (step < 3) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const n = prev + 1;
          if (n >= 3) { setInterviewEnded(true); alert('🚨 Interview Terminated!'); }
          else { alert(`⚠️ Warning ${n}/3! Do not switch tabs!`); }
          return n;
        });
      }
    };
   let alertShowing = false;
    const handleBlur = () => {
      if (alertShowing) return;
      alertShowing = true;
      setWarnings(prev => {
        const n = prev + 1;
        setTimeout(() => {
          if (n >= 3) { setInterviewEnded(true); alert('🚨 Interview Terminated!'); }
          else { alert(`⚠️ Warning ${n}/3! Do not leave the window!`); }
          alertShowing = false;
        }, 500);
        return n;
      });
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [step]);

  const handleRegister = () => {
    if (!email.includes('@')) return alert('Please enter a valid email!');
    if (password.length < 6) return alert('Password must be at least 6 characters!');
    if (password !== confirmPassword) return alert('Passwords do not match!');
    localStorage.setItem('ai_interview_email', email);
    localStorage.setItem('ai_interview_pass_' + email, password);
    setLoggedInEmail(email); setAuthMode('done');
  };

  const handleLogin = () => {
    const savedPass = localStorage.getItem('ai_interview_pass_' + savedEmail);
    if (password !== savedPass) return alert('Wrong password!');
    setLoggedInEmail(savedEmail); setAuthMode('done');
  };

  const handleLogout = () => {
    setLoggedInEmail(''); setPassword('');
    setAuthMode('welcome-back'); resetAll();
  };

  const uploadResume = async () => {
    if (!file) return alert('Please select a PDF file first!');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:8000/upload-resume', { method: 'POST', body: formData });
    const data = await res.json();
    setResumeText(data.full_text); setStep(2); setLoading(false);
  };

  const generateQuestions = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/generate-questions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText, role: selectedRole.label, mode: selectedMode, language }),
    });
    const data = await res.json();
    setQuestions(data.questions); setStep(3); setLoading(false);
  };

  const startPanelInterview = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/panel-questions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText, role: selectedRole.label, language }),
    });
    const data = await res.json();
    setPanelQuestions(data.panel_questions);
    setPanelMode(true);
    setStep(3);
    setLoading(false);
  };

  const getPanelFeedback = async () => {
    if (!transcript) return alert('Please record or type your answer first!');
    setLoading(true);
    const res = await fetch('http://localhost:8000/panel-feedback', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: transcript, questions: panelQuestions, role: selectedRole.label, language }),
    });
    const data = await res.json();
    setPanelFeedback(data.panel_feedback); setLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch { alert('Microphone access denied!'); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      setLoading(true);
      const res = await fetch('http://localhost:8000/transcribe', { method: 'POST', body: formData });
      const data = await res.json();
      setTranscript(data.transcript); setLoading(false);
    };
  };

  const getAIFeedback = async () => {
    if (!transcript) return alert('Please record or type your answer first!');
    setLoading(true);
    const res = await fetch('http://localhost:8000/get-feedback', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: transcript, questions, email: loggedInEmail, role: selectedRole.label, mode: selectedMode, language }),
    });
    const data = await res.json();
    setFeedback(data.feedback); setLoading(false);
  };

  const getIdealAnswer = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/ideal-answer', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions, role: selectedRole.label, mode: selectedMode, user_answer: transcript, language }),
    });
    const data = await res.json();
    setIdealAnswer(data.ideal_answer); setShowIdeal(true); setLoading(false);
  };

  const loadSessions = async () => {
    const res = await fetch(`http://localhost:8000/sessions?email=${loggedInEmail}`);
    const data = await res.json();
    setSessions(data); setShowHistory(true);
  };

  const resetAll = () => {
    setStep(1); setFile(null); setResumeText(''); setQuestions('');
    setTranscript(''); setFeedback(''); setIdealAnswer(''); setShowIdeal(false);
    setSelectedCategory(null); setSelectedRole(null); setSelectedMode(null);
    setWarnings(0); setInterviewEnded(false);
    setPanelMode(false); setPanelQuestions(''); setPanelFeedback('');
  };

  const fullBg = (bg) => ({ minHeight: '100vh', background: bg, backgroundSize: 'cover', backgroundPosition: 'center' });
  const centerFlex = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' };
  const card = { background: 'rgba(255,255,255,0.1)', padding: isMobile ? '25px 20px' : '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', backdropFilter: 'blur(10px)' };
  const inp = { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '15px', marginBottom: '12px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' };
  const glassBox = { background: 'rgba(255,255,255,0.1)', padding: isMobile ? '15px' : '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' };
  const btnGlass = { padding: isMobile ? '14px 10px' : '18px 15px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white', fontSize: isMobile ? '13px' : '14px', cursor: 'pointer', backdropFilter: 'blur(10px)', textAlign: 'center' };
  const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '10px' : '15px', maxWidth: '500px', width: '100%', padding: '0 10px' };

  if (authMode === 'checking') return (
    <div style={{ ...fullBg(BG), ...centerFlex }}>
      <p style={{ color: 'white', fontSize: '18px' }}>⏳ Loading...</p>
    </div>
  );

  if (authMode === 'welcome-back') return (
    <div style={{ ...fullBg(BG), ...centerFlex }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '28px' : '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
      <div style={card}>
        <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Welcome Back!</h3>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
          <p style={{ color: '#64ffda', margin: 0, fontWeight: 'bold' }}>📧 {savedEmail}</p>
        </div>
        <input type="password" placeholder="Enter your password" value={password}
          onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} style={inp} />
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
          🚀 Login
        </button>
        <button onClick={() => { setEmail(''); setPassword(''); setConfirmPassword(''); setAuthMode('register'); }}
          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
          👤 Use Different Account
        </button>
      </div>
    </div>
  );

  if (authMode === 'register') return (
    <div style={{ ...fullBg(BG), ...centerFlex }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '28px' : '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
      <div style={card}>
        <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Create Account</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>Save your progress and session history</p>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={inp} />
        <input type="password" placeholder="Create password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} style={inp} />
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleRegister()} style={inp} />
        <button onClick={handleRegister} style={{ width: '100%', padding: '12px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          🚀 Create Account & Start
        </button>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>Your data is saved locally on this device</p>
      </div>
    </div>
  );

  if (!selectedCategory) return (
    <div style={{ ...fullBg(BG), ...centerFlex }}>
      <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <button onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
          style={{ padding: '7px 12px', background: language === 'Hindi' ? '#FF9800' : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>
          {language === 'English' ? '🇮🇳 Hindi' : '🇬🇧 English'}
        </button>
        <button onClick={loadSessions} style={{ padding: '7px 12px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>📊 History</button>
        <button onClick={handleLogout} style={{ padding: '7px 12px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🚪 Logout</button>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontSize: '12px', marginTop: '60px' }}>👤 {loggedInEmail}</p>
      <h1 style={{ color: 'white', fontSize: isMobile ? '26px' : '36px', marginBottom: '10px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '25px', fontSize: '15px' }}>Step 1 of 3 — Choose your field</p>
      <div style={grid2}>
        {CATEGORIES.map((cat, index) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat)}
            style={{ ...btnGlass, gridColumn: index === 4 ? '1 / -1' : undefined, padding: isMobile ? '18px 10px' : '25px 20px', fontSize: isMobile ? '14px' : '16px' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >{cat.label}</button>
        ))}
      </div>
      {showHistory && (
        <div style={{ ...glassBox, marginTop: '20px', maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ color: 'white', margin: 0 }}>📊 My Sessions</h3>
            <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>
          {sessions.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>No sessions yet!</p> :
            sessions.map((s) => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: '0 0 3px' }}>📅 {s.created_at} | {s.role} | {s.mode}</p>
                <p style={{ color: 'white', fontSize: '13px', margin: '0 0 3px' }}><strong>Q:</strong> {s.questions}...</p>
                <p style={{ color: '#64ffda', fontSize: '13px', margin: 0 }}><strong>Feedback:</strong> {s.feedback}...</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  if (!selectedRole) return (
    <div style={{ ...fullBg(selectedCategory.bg), ...centerFlex }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '24px' : '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 2 of 3 — Choose your role</p>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '13px' }}>Field: {selectedCategory.label}</p>
      <div style={{ ...grid2, maxWidth: '550px' }}>
        {selectedCategory.roles.map((role, index) => (
          <button key={role.id} onClick={() => setSelectedRole(role)}
            style={{ ...btnGlass, gridColumn: selectedCategory.roles.length % 2 !== 0 && index === selectedCategory.roles.length - 1 ? '1 / -1' : undefined }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >{role.label}</button>
        ))}
      </div>
      <button onClick={() => setSelectedCategory(null)} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Back</button>
    </div>
  );

  if (!selectedMode) return (
    <div style={{ ...fullBg(selectedCategory.bg), ...centerFlex }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '24px' : '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 3 of 3 — Choose interview mode</p>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '13px' }}>Role: {selectedRole.label}</p>
      <div style={{ ...grid2, maxWidth: '550px' }}>
        {selectedRole.modes.map((mode, index) => (
          <button key={index} onClick={() => setSelectedMode(mode)}
            style={{ ...btnGlass, gridColumn: selectedRole.modes.length % 2 !== 0 && index === selectedRole.modes.length - 1 ? '1 / -1' : undefined }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >{mode}</button>
        ))}
      </div>
      <button onClick={() => setSelectedRole(null)} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Back</button>
    </div>
  );

  return (
    <div style={{ ...fullBg(selectedCategory.bg), backgroundAttachment: isMobile ? 'scroll' : 'fixed', padding: '15px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: isMobile ? '20px' : '24px' }}>🤖 AI Interview Prep</h1>
            <p style={{ color: selectedRole.text, margin: '3px 0', fontSize: '12px' }}>👤 {loggedInEmail} | {selectedRole.label} | {selectedMode}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
              style={{ padding: '7px 10px', background: language === 'Hindi' ? '#FF9800' : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>
              {language === 'English' ? '🇮🇳 Hindi' : '🇬🇧 English'}
            </button>
            <button onClick={loadSessions} style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>📊</button>
            <button onClick={resetAll} style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🔄</button>
            <button onClick={handleLogout} style={{ padding: '7px 10px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🚪</button>
          </div>
        </div>

        {/* History */}
        {showHistory && (
          <div style={glassBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'white', margin: 0 }}>📊 My Sessions</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {sessions.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>No sessions yet!</p> :
              sessions.map((s) => (
                <div key={s.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: '0 0 3px' }}>📅 {s.created_at} | {s.role} | {s.mode}</p>
                  <p style={{ color: 'white', fontSize: '13px', margin: '0 0 3px' }}><strong>Q:</strong> {s.questions}...</p>
                  <p style={{ color: selectedRole.text, fontSize: '13px', margin: 0 }}><strong>Feedback:</strong> {s.feedback}...</p>
                </div>
              ))}
          </div>
        )}

        {/* Warnings */}
        {step >= 3 && warnings > 0 && (
          <div style={{ background: 'rgba(255,0,0,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span>
            <p style={{ color: 'white', margin: 0, fontSize: '13px' }}><strong>Warning {warnings}/3</strong> — Do not switch tabs!</p>
          </div>
        )}

        {interviewEnded && (
          <div style={{ background: 'rgba(255,0,0,0.5)', padding: '25px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginTop: 0 }}>🚨 Interview Terminated!</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>You switched tabs 3 times.</p>
            <button onClick={() => { resetAll(); }}
              style={{ padding: '10px 25px', background: 'white', color: '#c00', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              🔄 Start Over
            </button>
          </div>
        )}

        {/* Step 1 */}
        <div style={glassBox}>
          <h3 style={{ color: 'white', marginTop: 0 }}>📄 Step 1 — Upload Your Resume</h3>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '10px 0', color: 'white', maxWidth: '100%' }} />
          <br />
          <button onClick={uploadResume} disabled={loading}
            style={{ marginTop: '10px', padding: '10px 25px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
            {loading ? '⏳ Reading...' : '📤 Upload Resume'}
          </button>
        </div>

        {/* Step 2 */}
        {step >= 2 && (
          <div style={glassBox}>
            <h3 style={{ color: 'white', marginTop: 0 }}>✅ Resume Uploaded!</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={generateQuestions} disabled={loading}
                style={{ padding: '10px 20px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isMobile ? '13px' : '15px', fontWeight: 'bold' }}>
                {loading ? '⏳ Generating...' : `🤖 Generate ${selectedMode} Questions`}
              </button>
              <button onClick={startPanelInterview} disabled={loading}
                style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #185FA5, #7B1FA2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isMobile ? '13px' : '15px', fontWeight: 'bold' }}>
                {loading ? '⏳ Loading...' : '👥 Start Panel Interview'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Normal Questions */}
        {step >= 3 && !panelMode && (
          <div style={glassBox}>
            <h3 style={{ color: 'white', marginTop: 0 }}>🎯 {selectedMode} Questions</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{questions}</pre>
            <h3 style={{ color: 'white', marginTop: '20px' }}>🎙️ Record Your Answer</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Works on ALL browsers!</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <button onClick={startRecording} disabled={isRecording}
                style={{ padding: '10px 18px', background: isRecording ? '#555' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                {isRecording ? '🔴 Recording...' : '🔴 Start Recording'}
              </button>
              <button onClick={stopRecording} disabled={!isRecording}
                style={{ padding: '10px 18px', background: !isRecording ? '#555' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                ⏹️ Stop & Transcribe
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Or type your answer:</p>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)}
              placeholder="Speak or type your answer here..."
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' }} />
            {loading && <p style={{ color: selectedRole.text }}>⏳ Processing...</p>}
            <button onClick={getAIFeedback} disabled={loading || !transcript}
              style={{ padding: '10px 20px', background: '#7B1FA2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isMobile ? '13px' : '15px' }}>
              {loading ? '⏳ Analyzing...' : '📊 Get AI Feedback & Score'}
            </button>
          </div>
        )}

        {/* Panel Interview */}
        {panelMode && panelQuestions && (
          <div style={{ ...glassBox, background: 'rgba(100,0,150,0.2)', border: '1px solid rgba(150,0,255,0.3)' }}>
            <h3 style={{ color: '#ce93d8', marginTop: 0 }}>👥 Mock Panel Interview</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '15px' }}>3 interviewers are waiting for your answer!</p>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '2', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{panelQuestions}</pre>
            <h3 style={{ color: 'white', marginTop: '20px' }}>🎙️ Your Answer to the Panel</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <button onClick={startRecording} disabled={isRecording}
                style={{ padding: '10px 18px', background: isRecording ? '#555' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {isRecording ? '🔴 Recording...' : '🔴 Start Recording'}
              </button>
              <button onClick={stopRecording} disabled={!isRecording}
                style={{ padding: '10px 18px', background: !isRecording ? '#555' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ⏹️ Stop & Transcribe
              </button>
            </div>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)}
              placeholder="Speak or type your answer to the panel..."
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' }} />
            {loading && <p style={{ color: '#ce93d8' }}>⏳ Panel is evaluating...</p>}
            <button onClick={getPanelFeedback} disabled={loading || !transcript}
              style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #185FA5, #7B1FA2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              {loading ? '⏳ Evaluating...' : '👥 Get Panel Verdict'}
            </button>
          </div>
        )}

        {/* Panel Feedback */}
        {panelFeedback && (
          <div style={{ ...glassBox, background: 'rgba(100,0,150,0.2)', border: '1px solid rgba(150,0,255,0.3)' }}>
            <h3 style={{ color: '#ce93d8', marginTop: 0 }}>👥 Panel Verdict</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{panelFeedback}</pre>
            <button onClick={() => { setPanelMode(false); setPanelQuestions(''); setPanelFeedback(''); setTranscript(''); }}
              style={{ marginTop: '15px', padding: '10px 20px', background: 'linear-gradient(135deg, #185FA5, #7B1FA2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              🔄 New Panel Interview
            </button>
          </div>
        )}

        {/* Normal Feedback */}
        {feedback && (
          <div style={{ ...glassBox, background: 'rgba(255,255,255,0.15)' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>📊 AI Feedback</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{feedback}</pre>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              <button onClick={getIdealAnswer} disabled={loading}
                style={{ padding: '10px 20px', background: '#FF6F00', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: isMobile ? '13px' : '15px' }}>
                {loading ? '⏳ Loading...' : '💡 Show Ideal Answer'}
              </button>
              <button onClick={resetAll}
                style={{ padding: '10px 20px', background: selectedRole.text, color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: isMobile ? '13px' : '15px' }}>
                🔄 New Session
              </button>
            </div>
            {showIdeal && idealAnswer && (
              <div style={{ background: 'rgba(0,255,0,0.1)', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid rgba(0,255,0,0.3)' }}>
                <h3 style={{ color: '#64ffda', marginTop: 0 }}>💡 Ideal Answer & Comparison</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{idealAnswer}</pre>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;