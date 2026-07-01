import React, { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  { id: 'tech', label: '💻 Technology', bg: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200")', roles: [
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
  ]},
  { id: 'government', label: '🏛️ Government', bg: 'linear-gradient(rgba(10,20,80,0.8), rgba(10,20,80,0.8)), url("https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200")', roles: [
    { id: 'ssc', label: '📝 SSC CGL/CHSL', text: '#ffffff', modes: ['📝 General Awareness', '🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '🎤 Interview Round'] },
    { id: 'upsc', label: '🏅 UPSC / IAS', text: '#ffd700', modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Personality Test', '📰 Current Affairs'] },
    { id: 'banking', label: '🏦 Banking / IBPS', text: '#4fc3f7', modes: ['🧮 Quantitative Aptitude', '📖 English', '🧠 Reasoning', '💰 Banking Awareness', '🎤 Interview'] },
    { id: 'railway', label: '🚂 Railway / RRB', text: '#81c784', modes: ['🧮 Mathematics', '🧠 Reasoning', '📝 General Awareness', '⚙️ Technical Round'] },
    { id: 'defence', label: '🎖️ Defence / NDA', text: '#ff8a65', modes: ['📚 General Knowledge', '🧮 Mathematics', '🎤 SSB Interview', '🏃 Physical Round'] },
    { id: 'police', label: '👮 Police / SSB', text: '#ce93d8', modes: ['📝 Written Test', '🎤 Interview Round', '🧠 Psychological Test', '🏃 Physical Test'] },
    { id: 'teaching', label: '🎓 Teaching / TET', text: '#80cbc4', modes: ['📚 Subject Knowledge', '🎤 Demo Lesson', '👔 HR Round', '🧠 Reasoning'] },
    { id: 'psc', label: '📋 State PSC', text: '#ffcc02', modes: ['📚 General Studies', '✍️ Essay Round', '🎤 Interview Round', '📰 Current Affairs'] },
  ]},
  { id: 'business', label: '👔 Business', bg: 'linear-gradient(rgba(0,50,0,0.8), rgba(0,50,0,0.8)), url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200")', roles: [
    { id: 'hr', label: '👔 HR Manager', text: '#ffffff', modes: ['👔 HR Round', '🤝 Behavioral Round', '📊 Case Study', '🎭 Role Play'] },
    { id: 'marketing', label: '📣 Marketing', text: '#ff8a65', modes: ['📣 Marketing Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
    { id: 'finance', label: '💰 Finance / CA', text: '#ffd54f', modes: ['💰 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Numerical Round'] },
    { id: 'product', label: '📦 Product Manager', text: '#80deea', modes: ['📦 Product Round', '👔 HR Round', '📊 Case Study', '🎯 Strategy Round'] },
    { id: 'sales', label: '🛒 Sales Executive', text: '#ef9a9a', modes: ['🛒 Sales Round', '👔 HR Round', '🎭 Role Play', '📊 Case Study'] },
    { id: 'analyst', label: '📈 Business Analyst', text: '#b39ddb', modes: ['📈 Technical Round', '👔 HR Round', '📊 Case Study', '🧮 Analytical Round'] },
    { id: 'consulting', label: '🤝 Consulting', text: '#a5d6a7', modes: ['🤝 Case Study Round', '👔 HR Round', '📊 Analytical Round', '🎯 Strategy Round'] },
    { id: 'entrepreneur', label: '🚀 Entrepreneur', text: '#ffcc02', modes: ['🚀 Pitch Round', '👔 HR Round', '📊 Business Plan Round', '💡 Innovation Round'] },
  ]},
  { id: 'creative', label: '🎨 Creative', bg: 'linear-gradient(rgba(60,0,100,0.8), rgba(60,0,100,0.8)), url("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200")', roles: [
    { id: 'uiux', label: '🎨 UI/UX Designer', text: '#ffffff', modes: ['🎨 Portfolio Review', '👔 HR Round', '🖥️ Design Challenge', '🤝 Behavioral Round'] },
    { id: 'graphic', label: '🖌️ Graphic Designer', text: '#ff80ab', modes: ['🖌️ Portfolio Review', '👔 HR Round', '🎨 Design Challenge'] },
    { id: 'content', label: '✍️ Content Writer', text: '#80d8ff', modes: ['✍️ Writing Test', '👔 HR Round', '📝 Editorial Round'] },
    { id: 'video', label: '🎬 Video Editor', text: '#ccff90', modes: ['🎬 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
    { id: 'animation', label: '🎭 Animator', text: '#ffd180', modes: ['🎭 Portfolio Review', '👔 HR Round', '⚙️ Technical Round'] },
    { id: 'photography', label: '📷 Photographer', text: '#ea80fc', modes: ['📷 Portfolio Review', '👔 HR Round', '🎨 Creative Round'] },
  ]},
  { id: 'other', label: '🏥 Other Fields', bg: 'linear-gradient(rgba(120,0,0,0.8), rgba(120,0,0,0.8)), url("https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200")', roles: [
    { id: 'medical', label: '🏥 Medical / Doctor', text: '#ffffff', modes: ['🏥 Clinical Round', '👔 HR Round', '📚 Subject Knowledge', '🎤 Viva Round'] },
    { id: 'law', label: '⚖️ Law / Legal', text: '#ffcc02', modes: ['⚖️ Legal Knowledge', '👔 HR Round', '📝 Case Study', '🎤 Moot Court'] },
    { id: 'civil', label: '🏗️ Civil Engineering', text: '#80cbc4', modes: ['🏗️ Technical Round', '👔 HR Round', '📐 Design Round'] },
    { id: 'aviation', label: '✈️ Aviation / Pilot', text: '#80d8ff', modes: ['✈️ Technical Round', '👔 HR Round', '🧠 Aptitude Round', '🎤 Simulator Round'] },
    { id: 'hospitality', label: '🏨 Hospitality', text: '#ffab91', modes: ['🏨 Service Round', '👔 HR Round', '🎭 Role Play', '🌍 Language Round'] },
    { id: 'journalism', label: '📰 Journalism', text: '#ce93d8', modes: ['📰 Writing Test', '👔 HR Round', '🎤 On-Air Round', '📺 Current Affairs'] },
  ]},
];

const BG = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200")';
const isMobile = window.innerWidth <= 600;
const BADGE_MAP = { first_step:'🌟', on_fire:'🔥', veteran:'🎖️', gold:'🥇', silver:'🥈', bronze:'🥉', code_warrior:'💻', hr_pro:'👔', bilingual:'🌍', panel_master:'👥' };

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
  const [newBadge, setNewBadge] = useState(null);
  const [weakTopics, setWeakTopics] = useState('');
  const [showWeakTopics, setShowWeakTopics] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showCompanyMode, setShowCompanyMode] = useState(false);
  const [codingMode, setCodingMode] = useState(false);
  const [codingProblem, setCodingProblem] = useState('');
  const [userCode, setUserCode] = useState('');
  const [codeReview, setCodeReview] = useState('');
  const [codingDifficulty, setCodingDifficulty] = useState('Medium');
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

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
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [step]);

  const checkAndAwardBadges = (feedbackText, sessionCount) => {
    const earned = JSON.parse(localStorage.getItem('ai_interview_badges_' + loggedInEmail) || '[]');
    const newBadges = [];
    if (sessionCount >= 1 && !earned.includes('first_step')) newBadges.push({ id: 'first_step', emoji: '🌟', name: 'First Step', desc: 'Completed your first interview!' });
    if (sessionCount >= 5 && !earned.includes('on_fire')) newBadges.push({ id: 'on_fire', emoji: '🔥', name: 'On Fire', desc: 'Completed 5 interviews!' });
    if (sessionCount >= 10 && !earned.includes('veteran')) newBadges.push({ id: 'veteran', emoji: '🎖️', name: 'Veteran', desc: 'Completed 10 interviews!' });
    const score = feedbackText.match(/\b([5-9]\d|100)\b/);
    if (score) {
      const s = parseInt(score[1]);
      if (s >= 90 && !earned.includes('gold')) newBadges.push({ id: 'gold', emoji: '🥇', name: 'Gold', desc: 'Scored 90+!' });
      else if (s >= 70 && !earned.includes('silver')) newBadges.push({ id: 'silver', emoji: '🥈', name: 'Silver', desc: 'Scored 70+!' });
      else if (s >= 50 && !earned.includes('bronze')) newBadges.push({ id: 'bronze', emoji: '🥉', name: 'Bronze', desc: 'Scored 50+!' });
    }
    if (selectedMode?.includes('Coding') && !earned.includes('code_warrior')) newBadges.push({ id: 'code_warrior', emoji: '💻', name: 'Code Warrior', desc: 'Completed a Coding Round!' });
    if (selectedMode?.includes('HR') && !earned.includes('hr_pro')) newBadges.push({ id: 'hr_pro', emoji: '👔', name: 'HR Pro', desc: 'Completed an HR Round!' });
    if (language === 'Hindi' && !earned.includes('bilingual')) newBadges.push({ id: 'bilingual', emoji: '🌍', name: 'Bilingual', desc: 'Used Hindi mode!' });
    if (newBadges.length > 0) {
      localStorage.setItem('ai_interview_badges_' + loggedInEmail, JSON.stringify([...earned, ...newBadges.map(b => b.id)]));
      setNewBadge(newBadges[0]);
      setTimeout(() => setNewBadge(null), 4000);
    }
  };

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

  const handleLogout = () => { setLoggedInEmail(''); setPassword(''); setAuthMode('welcome-back'); resetAll(); };

  const API = 'http://localhost:8001';

  const uploadResume = async () => {
    if (!file) return alert('Please select a PDF file first!');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API}/upload-resume`, { method: 'POST', body: formData });
    const data = await res.json();
    setResumeText(data.full_text); setStep(2); setLoading(false);
  };

  const generateQuestions = async () => {
    setLoading(true);
    const res = await fetch(`${API}/generate-questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resume_text: resumeText, role: selectedRole.label, mode: selectedMode, language }) });
    const data = await res.json();
    setQuestions(data.questions); setStep(3); setLoading(false);
  };

  const generateCompanyQuestions = async () => {
    if (!selectedCompany) return alert('Please select a company!');
    setLoading(true);
    const res = await fetch(`${API}/company-questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resume_text: resumeText, company: selectedCompany, role: selectedRole.label, language }) });
    const data = await res.json();
    setQuestions(data.questions); setStep(3); setShowCompanyMode(false); setLoading(false);
  };

  const startPanelInterview = async () => {
    setLoading(true);
    const res = await fetch(`${API}/panel-questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resume_text: resumeText, role: selectedRole.label, language }) });
    const data = await res.json();
    setPanelQuestions(data.panel_questions); setPanelMode(true); setStep(3); setLoading(false);
  };

  const getPanelFeedback = async () => {
    if (!transcript) return alert('Please record or type your answer!');
    setLoading(true);
    const res = await fetch(`${API}/panel-feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: transcript, questions: panelQuestions, role: selectedRole.label, language }) });
    const data = await res.json();
    setPanelFeedback(data.panel_feedback);
    const earned = JSON.parse(localStorage.getItem('ai_interview_badges_' + loggedInEmail) || '[]');
    if (!earned.includes('panel_master')) {
      localStorage.setItem('ai_interview_badges_' + loggedInEmail, JSON.stringify([...earned, 'panel_master']));
      setNewBadge({ id: 'panel_master', emoji: '👥', name: 'Panel Master', desc: 'Completed a Panel Interview!' });
      setTimeout(() => setNewBadge(null), 4000);
    }
    setLoading(false);
  };

  const generateCodingProblem = async () => {
    setLoading(true);
    const res = await fetch(`${API}/coding-problem`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: selectedRole.label, difficulty: codingDifficulty, language }) });
    const data = await res.json();
    setCodingProblem(data.problem); setCodingMode(true); setStep(3); setUserCode(''); setCodeReview(''); setLoading(false);
  };

  const reviewCode = async () => {
    if (!userCode) return alert('Please write your code first!');
    setLoading(true);
    const res = await fetch(`${API}/review-code`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: userCode, problem: codingProblem, language }) });
    const data = await res.json();
    setCodeReview(data.review); setLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.start(); setIsRecording(true);
    } catch { alert('Microphone access denied!'); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop(); setIsRecording(false);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      setLoading(true);
      const res = await fetch(`${API}/transcribe`, { method: 'POST', body: formData });
      const data = await res.json();
      setTranscript(data.transcript); setLoading(false);
    };
  };

  const getAIFeedback = async () => {
    if (!transcript) return alert('Please record or type your answer!');
    setLoading(true);
    const res = await fetch(`${API}/get-feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: transcript, questions, email: loggedInEmail, role: selectedRole.label, mode: selectedMode, language }) });
    const data = await res.json();
    setFeedback(data.feedback); setLoading(false); stopTimer();
    const sessRes = await fetch(`${API}/sessions?email=${loggedInEmail}`);
    const sessData = await sessRes.json();
    checkAndAwardBadges(data.feedback, sessData.length);
  };

  const getIdealAnswer = async () => {
    setLoading(true);
    const res = await fetch(`${API}/ideal-answer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ questions, role: selectedRole.label, mode: selectedMode, user_answer: transcript, language }) });
    const data = await res.json();
    setIdealAnswer(data.ideal_answer); setShowIdeal(true); setLoading(false);
  };

  const analyzeWeakTopics = async () => {
    setLoading(true);
    const res = await fetch(`${API}/analyze-weak-topics`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ feedback, role: selectedRole.label, language }) });
    const data = await res.json();
    setWeakTopics(data.weak_topics); setShowWeakTopics(true); setLoading(false);
  };

  const loadSessions = async () => {
    const res = await fetch(`${API}/sessions?email=${loggedInEmail}`);
    const data = await res.json();
    setSessions(data); setShowHistory(true);
  };

  const startTimer = () => {
    setTimeLeft(120); setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); setTimerActive(false); alert('⏰ Time is up!'); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => { clearInterval(timerRef.current); setTimerActive(false); };
  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const resetAll = () => {
    setStep(1); setFile(null); setResumeText(''); setQuestions(''); setTranscript(''); setFeedback('');
    setIdealAnswer(''); setShowIdeal(false); setSelectedCategory(null); setSelectedRole(null); setSelectedMode(null);
    setWarnings(0); setInterviewEnded(false); setPanelMode(false); setPanelQuestions(''); setPanelFeedback('');
    setWeakTopics(''); setShowWeakTopics(false); setSelectedCompany(''); setShowCompanyMode(false);
    setCodingMode(false); setCodingProblem(''); setUserCode(''); setCodeReview('');
    clearInterval(timerRef.current); setTimeLeft(120); setTimerActive(false);
  };

  const G = (bg) => ({ minHeight: '100vh', background: bg, backgroundSize: 'cover', backgroundPosition: 'center' });
  const C = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' };
  const card = { background: 'rgba(255,255,255,0.1)', padding: isMobile ? '25px 20px' : '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', backdropFilter: 'blur(10px)' };
  const inp = { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '15px', marginBottom: '12px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' };
  const GB = { background: 'rgba(255,255,255,0.1)', padding: isMobile ? '15px' : '25px', borderRadius: '12px', marginBottom: '15px', backdropFilter: 'blur(10px)' };
  const BG2 = { padding: isMobile ? '14px 10px' : '18px 15px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white', fontSize: isMobile ? '13px' : '14px', cursor: 'pointer', backdropFilter: 'blur(10px)', textAlign: 'center' };
  const GR = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '10px' : '15px', maxWidth: '500px', width: '100%', padding: '0 10px' };
  const myBadges = JSON.parse(localStorage.getItem('ai_interview_badges_' + loggedInEmail) || '[]');
  const btn = (bg, color='white') => ({ padding: '10px 20px', background: bg, color, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isMobile ? '13px' : '15px', fontWeight: 'bold' });

  if (authMode === 'checking') return <div style={{ ...G(BG), ...C }}><p style={{ color: 'white' }}>⏳ Loading...</p></div>;

  if (authMode === 'welcome-back') return (
    <div style={{ ...G(BG), ...C }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '28px' : '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
      <div style={card}>
        <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Welcome Back!</h3>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
          <p style={{ color: '#64ffda', margin: 0, fontWeight: 'bold' }}>📧 {savedEmail}</p>
        </div>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} style={inp} />
        <button onClick={handleLogin} style={{ ...btn('#185FA5'), width: '100%', padding: '12px', fontSize: '16px', marginBottom: '10px' }}>🚀 Login</button>
        <button onClick={() => { setEmail(''); setPassword(''); setConfirmPassword(''); setAuthMode('register'); }} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>👤 Use Different Account</button>
      </div>
    </div>
  );

  if (authMode === 'register') return (
    <div style={{ ...G(BG), ...C }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '28px' : '36px', marginBottom: '30px' }}>🤖 AI Interview Prep</h1>
      <div style={card}>
        <h3 style={{ color: 'white', marginTop: 0, textAlign: 'center' }}>👋 Create Account</h3>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={inp} />
        <input type="password" placeholder="Create password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} style={inp} />
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleRegister()} style={inp} />
        <button onClick={handleRegister} style={{ ...btn('#185FA5'), width: '100%', padding: '12px', fontSize: '16px' }}>🚀 Create Account & Start</button>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>Your data is saved locally on this device</p>
      </div>
    </div>
  );

  if (!selectedCategory) return (
    <div style={{ ...G(BG), ...C }}>
      <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <button onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')} style={{ padding: '7px 12px', background: language === 'Hindi' ? '#FF9800' : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>{language === 'English' ? '🇮🇳 Hindi' : '🇬🇧 English'}</button>
        <button onClick={loadSessions} style={{ padding: '7px 12px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>📊 History</button>
        <button onClick={handleLogout} style={{ padding: '7px 12px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🚪 Logout</button>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontSize: '12px', marginTop: '60px' }}>👤 {loggedInEmail}</p>
      {myBadges.length > 0 && <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>{myBadges.map((b, i) => <span key={i} title={b} style={{ fontSize: '20px' }}>{BADGE_MAP[b] || '🏅'}</span>)}</div>}
      <h1 style={{ color: 'white', fontSize: isMobile ? '26px' : '36px', marginBottom: '10px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '25px', fontSize: '15px' }}>Step 1 of 3 — Choose your field</p>
      <div style={GR}>
        {CATEGORIES.map((cat, index) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat)} style={{ ...BG2, gridColumn: index === 4 ? '1 / -1' : undefined, padding: isMobile ? '18px 10px' : '25px 20px', fontSize: isMobile ? '14px' : '16px' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>{cat.label}</button>
        ))}
      </div>
      {showHistory && (
        <div style={{ ...GB, marginTop: '20px', maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ color: 'white', margin: 0 }}>📊 My Sessions</h3>
            <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>
          {sessions.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>No sessions yet!</p> : sessions.map((s) => (
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
    <div style={{ ...G(selectedCategory.bg), ...C }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '24px' : '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 2 of 3 — Choose your role</p>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '13px' }}>Field: {selectedCategory.label}</p>
      <div style={{ ...GR, maxWidth: '550px' }}>
        {selectedCategory.roles.map((role, index) => (
          <button key={role.id} onClick={() => setSelectedRole(role)} style={{ ...BG2, gridColumn: selectedCategory.roles.length % 2 !== 0 && index === selectedCategory.roles.length - 1 ? '1 / -1' : undefined }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>{role.label}</button>
        ))}
      </div>
      <button onClick={() => setSelectedCategory(null)} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Back</button>
    </div>
  );

  if (!selectedMode) return (
    <div style={{ ...G(selectedCategory.bg), ...C }}>
      <h1 style={{ color: 'white', fontSize: isMobile ? '24px' : '32px', marginBottom: '5px', textAlign: 'center' }}>🤖 AI Interview Prep</h1>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '5px', fontSize: '14px' }}>Step 3 of 3 — Choose interview mode</p>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '13px' }}>Role: {selectedRole.label}</p>
      <div style={{ ...GR, maxWidth: '550px' }}>
        {selectedRole.modes.map((mode, index) => (
          <button key={index} onClick={() => setSelectedMode(mode)} style={{ ...BG2, gridColumn: selectedRole.modes.length % 2 !== 0 && index === selectedRole.modes.length - 1 ? '1 / -1' : undefined }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>{mode}</button>
        ))}
      </div>
      <button onClick={() => setSelectedRole(null)} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Back</button>
    </div>
  );

  return (
    <div style={{ ...G(selectedCategory.bg), backgroundAttachment: isMobile ? 'scroll' : 'fixed', padding: '15px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: isMobile ? '20px' : '24px' }}>🤖 AI Interview Prep</h1>
            <p style={{ color: selectedRole.text, margin: '3px 0', fontSize: '12px' }}>👤 {loggedInEmail} | {selectedRole.label} | {selectedMode}</p>
            {myBadges.length > 0 && <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>{myBadges.map((b, i) => <span key={i} title={b.replace('_',' ')} style={{ fontSize: '16px' }}>{BADGE_MAP[b] || '🏅'}</span>)}</div>}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')} title="Switch Language" style={{ padding: '7px 10px', background: language === 'Hindi' ? '#FF9800' : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>{language === 'English' ? '🇮🇳 Hindi' : '🇬🇧 English'}</button>
            <button onClick={loadSessions} title="History" style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>📊</button>
            <button onClick={resetAll} title="Restart" style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🔄</button>
            <button onClick={handleLogout} title="Logout" style={{ padding: '7px 10px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.4)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>🚪</button>
          </div>
        </div>

        {showHistory && (
          <div style={GB}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'white', margin: 0 }}>📊 My Sessions</h3>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            {sessions.length === 0 ? <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>No sessions yet!</p> : sessions.map((s) => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginTop: '10px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: '0 0 3px' }}>📅 {s.created_at} | {s.role} | {s.mode}</p>
                <p style={{ color: 'white', fontSize: '13px', margin: '0 0 3px' }}><strong>Q:</strong> {s.questions}...</p>
                <p style={{ color: selectedRole.text, fontSize: '13px', margin: 0 }}><strong>Feedback:</strong> {s.feedback}...</p>
              </div>
            ))}
          </div>
        )}

        {step >= 3 && warnings > 0 && (
          <div style={{ background: 'rgba(255,0,0,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span><p style={{ color: 'white', margin: 0, fontSize: '13px' }}><strong>Warning {warnings}/3</strong> — Do not switch tabs!</p>
          </div>
        )}

        {interviewEnded && (
          <div style={{ background: 'rgba(255,0,0,0.5)', padding: '25px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginTop: 0 }}>🚨 Interview Terminated!</h2>
            <button onClick={resetAll} style={{ padding: '10px 25px', background: 'white', color: '#c00', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🔄 Start Over</button>
          </div>
        )}

        {/* Step 1 */}
        <div style={GB}>
          <h3 style={{ color: 'white', marginTop: 0 }}>📄 Step 1 — Upload Your Resume</h3>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '10px 0', color: 'white', maxWidth: '100%' }} /><br />
          <button onClick={uploadResume} disabled={loading} style={{ ...btn(selectedRole.text, '#000'), marginTop: '10px' }}>{loading ? '⏳ Reading...' : '📤 Upload Resume'}</button>
        </div>

        {/* Step 2 */}
        {step >= 2 && (
          <div style={GB}>
            <h3 style={{ color: 'white', marginTop: 0 }}>✅ Resume Uploaded!</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <button onClick={generateQuestions} disabled={loading} style={btn(selectedRole.text, '#000')}>{loading ? '⏳...' : `🤖 ${selectedMode} Questions`}</button>
              <button onClick={startPanelInterview} disabled={loading} style={btn('linear-gradient(135deg,#185FA5,#7B1FA2)')}>{loading ? '⏳...' : '👥 Panel Interview'}</button>
              <button onClick={() => setShowCompanyMode(!showCompanyMode)} disabled={loading} style={btn('#FF6F00')}>🏢 Company Round</button>
              <button onClick={generateCodingProblem} disabled={loading} style={btn('#00897B')}>{loading ? '⏳...' : '💻 Coding Simulator'}</button>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Coding Level:</span>
              {['Easy', 'Medium', 'Hard'].map(d => (
                <button key={d} onClick={() => setCodingDifficulty(d)} style={{ padding: '5px 12px', background: codingDifficulty === d ? '#00897B' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>{d}</button>
              ))}
            </div>
            {showCompanyMode && (
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
                <p style={{ color: 'white', marginTop: 0, fontWeight: 'bold' }}>🏢 Select Company:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '12px' }}>
                  {['Google','Amazon','Microsoft','TCS','Infosys','Wipro','Goldman Sachs','Startup'].map(company => (
                    <button key={company} onClick={() => setSelectedCompany(company)} style={{ padding: '8px', background: selectedCompany === company ? '#FF6F00' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>
                      {company === 'Google' ? '🔵' : company === 'Amazon' ? '🟠' : company === 'Microsoft' ? '🟦' : company === 'TCS' ? '🇮🇳' : company === 'Infosys' ? '💼' : company === 'Wipro' ? '🌐' : company === 'Goldman Sachs' ? '💰' : '🚀'} {company}
                    </button>
                  ))}
                </div>
                <button onClick={generateCompanyQuestions} disabled={loading || !selectedCompany} style={{ ...btn('#FF6F00'), width: '100%' }}>{loading ? '⏳...' : `🏢 Generate ${selectedCompany || 'Company'} Questions`}</button>
              </div>
            )}
          </div>
        )}

        {/* Coding Simulator */}
        {codingMode && codingProblem && (
          <div style={{ ...GB, background: 'rgba(0,80,70,0.3)', border: '1px solid rgba(0,200,150,0.3)' }}>
            <h3 style={{ color: '#64ffda', marginTop: 0 }}>💻 Coding Round Simulator — {codingDifficulty}</h3>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '12px' : '13px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto', margin: 0 }}>{codingProblem}</pre>
            </div>
            <h3 style={{ color: 'white' }}>✍️ Write Your Code:</h3>
            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)}
              placeholder={`# Write your solution here\ndef solution():\n    pass`}
              style={{ width: '100%', height: '200px', padding: '15px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: '#1e1e1e', color: '#d4d4d4', fontFamily: 'monospace', boxSizing: 'border-box', resize: 'vertical' }} />
            {loading && <p style={{ color: '#64ffda' }}>⏳ AI is reviewing your code...</p>}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={reviewCode} disabled={loading || !userCode} style={btn('#00897B')}>🔍 Review My Code</button>
              <button onClick={generateCodingProblem} disabled={loading} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>🔄 New Problem</button>
            </div>
            {codeReview && (
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
                <h3 style={{ color: '#64ffda', marginTop: 0 }}>🔍 Code Review</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{codeReview}</pre>
              </div>
            )}
          </div>
        )}

        {/* Step 3 Normal */}
        {step >= 3 && !panelMode && !codingMode && (
          <div style={GB}>
            <h3 style={{ color: 'white', marginTop: 0 }}>🎯 {selectedCompany ? `🏢 ${selectedCompany}` : selectedMode} Questions</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{questions}</pre>
            <h3 style={{ color: 'white', marginTop: '20px' }}>🎙️ Record Your Answer</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <div style={{ background: timeLeft <= 30 ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '8px', border: `2px solid ${timeLeft <= 30 ? '#f44336' : 'rgba(255,255,255,0.3)'}` }}>
                <span style={{ color: timeLeft <= 30 ? '#ff5252' : 'white', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>⏱️ {formatTime(timeLeft)}</span>
              </div>
              <button onClick={timerActive ? stopTimer : startTimer} style={{ padding: '10px 20px', background: timerActive ? '#555' : '#185FA5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                {timerActive ? '⏸️ Pause' : '▶️ Start Timer'}
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Works on ALL browsers!</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <button onClick={startRecording} disabled={isRecording} style={{ padding: '10px 18px', background: isRecording ? '#555' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{isRecording ? '🔴 Recording...' : '🔴 Start Recording'}</button>
              <button onClick={stopRecording} disabled={!isRecording} style={{ padding: '10px 18px', background: !isRecording ? '#555' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>⏹️ Stop & Transcribe</button>
            </div>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Speak or type your answer here..."
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' }} />
            {loading && <p style={{ color: selectedRole.text }}>⏳ Processing...</p>}
            <button onClick={getAIFeedback} disabled={loading || !transcript} style={btn('#7B1FA2')}>{loading ? '⏳ Analyzing...' : '📊 Get AI Feedback & Score'}</button>
          </div>
        )}

        {/* Panel Interview */}
        {panelMode && panelQuestions && (
          <div style={{ ...GB, background: 'rgba(100,0,150,0.2)', border: '1px solid rgba(150,0,255,0.3)' }}>
            <h3 style={{ color: '#ce93d8', marginTop: 0 }}>👥 Mock Panel Interview</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '2', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{panelQuestions}</pre>
            <h3 style={{ color: 'white', marginTop: '20px' }}>🎙️ Your Answer</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <button onClick={startRecording} disabled={isRecording} style={{ padding: '10px 18px', background: isRecording ? '#555' : '#e53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{isRecording ? '🔴 Recording...' : '🔴 Start Recording'}</button>
              <button onClick={stopRecording} disabled={!isRecording} style={{ padding: '10px 18px', background: !isRecording ? '#555' : '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>⏹️ Stop & Transcribe</button>
            </div>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Speak or type your answer..."
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,255,255,0.9)', boxSizing: 'border-box' }} />
            {loading && <p style={{ color: '#ce93d8' }}>⏳ Panel is evaluating...</p>}
            <button onClick={getPanelFeedback} disabled={loading || !transcript} style={btn('linear-gradient(135deg,#185FA5,#7B1FA2)')}>{loading ? '⏳ Evaluating...' : '👥 Get Panel Verdict'}</button>
          </div>
        )}

        {panelFeedback && (
          <div style={{ ...GB, background: 'rgba(100,0,150,0.2)', border: '1px solid rgba(150,0,255,0.3)' }}>
            <h3 style={{ color: '#ce93d8', marginTop: 0 }}>👥 Panel Verdict</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{panelFeedback}</pre>
            <button onClick={() => { setPanelMode(false); setPanelQuestions(''); setPanelFeedback(''); setTranscript(''); }} style={{ ...btn('linear-gradient(135deg,#185FA5,#7B1FA2)'), marginTop: '15px' }}>🔄 New Panel Interview</button>
          </div>
        )}

        {/* Normal Feedback */}
        {feedback && (
          <div style={{ ...GB, background: 'rgba(255,255,255,0.15)' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>📊 AI Feedback</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{feedback}</pre>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              <button onClick={getIdealAnswer} disabled={loading} style={btn('#FF6F00')}>{loading ? '⏳...' : '💡 Ideal Answer'}</button>
              <button onClick={analyzeWeakTopics} disabled={loading} style={btn('#e53935')}>{loading ? '⏳...' : '🎯 Weak Topics'}</button>
              <button onClick={resetAll} style={btn(selectedRole.text, '#000')}>🔄 New Session</button>
            </div>
            {showWeakTopics && weakTopics && (
              <div style={{ background: 'rgba(255,0,0,0.1)', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid rgba(255,0,0,0.3)' }}>
                <h3 style={{ color: '#ff8a65', marginTop: 0 }}>🎯 Weak Topic Analysis</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{weakTopics}</pre>
              </div>
            )}
            {showIdeal && idealAnswer && (
              <div style={{ background: 'rgba(0,255,0,0.1)', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid rgba(0,255,0,0.3)' }}>
                <h3 style={{ color: '#64ffda', marginTop: 0 }}>💡 Ideal Answer</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', overflowX: 'auto' }}>{idealAnswer}</pre>
              </div>
            )}
          </div>
        )}

        {newBadge && (
          <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: 'linear-gradient(135deg,#185FA5,#7B1FA2)', padding: '20px 25px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 1000 }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 5px', fontSize: '12px' }}>🏆 New Badge!</p>
            <p style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{newBadge.emoji} {newBadge.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0', fontSize: '13px' }}>{newBadge.desc}</p>
          </div>
        )}

      </div>
      {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          © 2024 Shruti. All Rights Reserved. | Built by Shruti
        </div>
    </div>
    
  );
}

export default App;