from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io
from groq import Groq
from dotenv import load_dotenv
import os
import tempfile
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

engine = create_engine("sqlite:///interview_sessions.db")
Base = declarative_base()

class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True)
    email = Column(String)
    role = Column(String)
    mode = Column(String)
    questions = Column(Text)
    answer = Column(Text)
    feedback = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

app = FastAPI() # v2

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Interview Prep API is running!"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = ""
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return {
        "filename": file.filename,
        "preview": text[:500],
        "full_text": text
    }

@app.post("/generate-questions")
async def generate_questions(data: dict):
    resume_text = data.get("resume_text", "")
    role = data.get("role", "")
    mode = data.get("mode", "")
    language = data.get("language", "English")
    prompt = f"""
    You are an expert interviewer. Generate 5 interview questions for:
    Role: {role}
    Interview Mode: {mode}

    Candidate Resume:
    {resume_text}

    Generate questions strictly based on the interview mode:
    - If HR Round: behavioral, situational, personality questions
    - If Coding Round: DSA, problem solving, coding questions
    - If Technical Round: deep technical knowledge questions
    - If GK/Awareness Round: general knowledge, current affairs questions
    - If Aptitude Round: numerical, logical reasoning questions
    - For any other mode: relevant questions matching that mode

    Language: {language}
    Generate all questions in {language} language only.
    Format as numbered list only. No extra text.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"questions": response.choices[0].message.content}

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name
    with open(tmp_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=("recording.webm", audio_file, "audio/webm"),
            model="whisper-large-v3",
        )
    os.unlink(tmp_path)
    return {"transcript": transcription.text}

@app.post("/get-feedback")
async def get_feedback(data: dict):
    answer = data.get("answer", "")
    questions = data.get("questions", "")
    email = data.get("email", "guest")
    role = data.get("role", "")
    mode = data.get("mode", "")
    language = data.get("language", "English")
    prompt = f"""
    The candidate was asked these interview questions:
    {questions}

    Their answer was:
    {answer}

    Please provide in {language} language:
    1. Confidence Score (out of 100)
    2. What they did well
    3. What they can improve
    4. Overall rating (Excellent/Good/Average/Poor)
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    feedback_text = response.choices[0].message.content

    db = SessionLocal()
    session = Session(
        email=email,
        role=role,
        mode=mode,
        questions=questions,
        answer=answer,
        feedback=feedback_text,
        created_at=datetime.utcnow()
    )
    db.add(session)
    db.commit()
    db.close()

    return {"feedback": feedback_text}

@app.get("/sessions")
def get_sessions(email: str = "guest"):
    db = SessionLocal()
    sessions = db.query(Session).filter(Session.email == email).order_by(Session.created_at.desc()).all()
    db.close()
    return [
        {
            "id": s.id,
            "email": s.email,
            "role": s.role,
            "mode": s.mode,
            "questions": s.questions[:100],
            "answer": s.answer[:100],
            "feedback": s.feedback[:200],
            "created_at": str(s.created_at)
        }
        for s in sessions
    ]

@app.post("/ideal-answer")
async def ideal_answer(data: dict):
    questions = data.get("questions", "")
    role = data.get("role", "")
    mode = data.get("mode", "")
    user_answer = data.get("user_answer", "")
    language = data.get("language", "English")
    prompt = f"""
    Role: {role}
    Interview Mode: {mode}

    Question asked: {questions}

    Candidate's answer: {user_answer}

    Please provide:
    1. ✅ IDEAL ANSWER — What a perfect answer looks like for this role and mode
    2. 🔑 KEY POINTS — 3-5 bullet points the candidate should have mentioned
    3. 📊 COMPARISON — How candidate's answer compares to ideal (what they got right, what they missed)
    4. 💡 PRO TIP — One expert tip specific to {mode} interviews

    Keep it practical and specific to {role} {mode}.
    Respond in {language} language only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"ideal_answer": response.choices[0].message.content}
@app.post("/panel-questions")
async def panel_questions(data: dict):
    resume_text = data.get("resume_text", "")
    role = data.get("role", "")
    language = data.get("language", "English")
    prompt = f"""
    You are organizing a mock panel interview for a {role} position.
    
    Based on this resume:
    {resume_text}
    
    Generate ONE question from each of these 3 panelists:
    
    1. 👨‍💼 TECHNICAL EXPERT (Dr. Sharma): Ask a deep technical question specific to their skills
    2. 👩‍💼 HR MANAGER (Ms. Priya): Ask a behavioral/situational question
    3. 👴 SENIOR DIRECTOR (Mr. Mehta): Ask a strategic/leadership/vision question
    
    Format exactly like this:
    👨‍💼 Dr. Sharma (Technical Expert):
    [question here]
    
    👩‍💼 Ms. Priya (HR Manager):
    [question here]
    
    👴 Mr. Mehta (Senior Director):
    [question here]
    
    Respond in {language} language only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"panel_questions": response.choices[0].message.content}

@app.post("/panel-feedback")
async def panel_feedback(data: dict):
    answer = data.get("answer", "")
    questions = data.get("questions", "")
    role = data.get("role", "")
    language = data.get("language", "English")
    prompt = f"""
    A candidate for {role} position was asked these panel interview questions:
    {questions}
    
    Their answer was:
    {answer}
    
    Now each panelist gives their individual feedback:
    
    👨‍💼 DR. SHARMA (Technical Expert) Feedback:
    - Technical accuracy score (out of 10)
    - What was technically good
    - What technical knowledge was missing
    
    👩‍💼 MS. PRIYA (HR Manager) Feedback:
    - Communication score (out of 10)
    - What behavioral aspects were good
    - What soft skills need improvement
    
    👴 MR. MEHTA (Senior Director) Feedback:
    - Leadership/Vision score (out of 10)
    - What strategic thinking was shown
    - What needs improvement
    
    🏆 PANEL VERDICT:
    - Overall Panel Score (out of 100)
    - Hiring Recommendation (Strong Yes / Yes / Maybe / No)
    - One key advice from the panel
    
    Respond in {language} language only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"panel_feedback": response.choices[0].message.content}
@app.post("/analyze-weak-topics")
async def analyze_weak_topics(data: dict):
    feedback = data.get("feedback", "")
    role = data.get("role", "")
    language = data.get("language", "English")
    prompt = f"""
    Based on this interview feedback for {role}:
    {feedback}
    
    Identify and list:
    1. 🔴 WEAK TOPICS — Areas where candidate struggled (be specific)
    2. 🟡 AVERAGE TOPICS — Areas that need improvement
    3. 🟢 STRONG TOPICS — Areas candidate did well
    4. 📚 STUDY PLAN — Top 3 specific things to study/practice next
    
    Be very specific about topic names (e.g. "Binary Search Trees", "System Design", "STAR Method" etc.)
    Respond in {language} language only.
    Format clearly with emoji headers.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"weak_topics": response.choices[0].message.content}
@app.post("/company-questions")
async def company_questions(data: dict):
    resume_text = data.get("resume_text", "")
    company = data.get("company", "")
    role = data.get("role", "")
    language = data.get("language", "English")
    prompt = f"""
    You are an interviewer at {company}. 
    Generate 5 interview questions for a {role} position at {company}.
    
    Follow {company}'s specific interview style:
    - Google: Focus on algorithms, system design, and problem solving
    - Amazon: Focus on Leadership Principles (LP) and behavioral questions
    - Microsoft: Focus on problem solving, culture fit, and technical depth
    - TCS: Focus on basic technical knowledge, aptitude and HR questions
    - Infosys: Focus on technical fundamentals and situational questions
    - Wipro: Focus on technical skills and communication
    - Startup: Focus on versatility, ownership, and quick learning
    - Goldman Sachs: Focus on finance, analytical thinking and coding
    
    Candidate Resume:
    {resume_text}
    
    Respond in {language} language only.
    Format as numbered list only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"questions": response.choices[0].message.content}
@app.post("/coding-problem")
async def coding_problem(data: dict):
    role = data.get("role", "")
    difficulty = data.get("difficulty", "Medium")
    language = data.get("language", "English")
    prompt = f"""
    Generate a coding problem for a {role} interview.
    Difficulty: {difficulty}
    
    Format exactly like this:
    
    🎯 PROBLEM TITLE: [title]
    
    📝 DESCRIPTION:
    [problem description]
    
    📥 INPUT:
    [input format]
    
    📤 OUTPUT:
    [output format]
    
    💡 EXAMPLE:
    Input: [example input]
    Output: [example output]
    
    ⚡ CONSTRAINTS:
    [constraints]
    
    🔑 HINT: [one small hint]
    
    Respond in {language} language only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"problem": response.choices[0].message.content}

@app.post("/review-code")
async def review_code(data: dict):
    code = data.get("code", "")
    problem = data.get("problem", "")
    language = data.get("language", "English")
    prompt = f"""
    Problem:
    {problem}
    
    Candidate's Code:
    {code}
    
    Please provide:
    1. ✅ CORRECTNESS — Does the code solve the problem? Any bugs?
    2. ⏰ TIME COMPLEXITY — What is the time complexity? (Big O)
    3. 💾 SPACE COMPLEXITY — What is the space complexity?
    4. 🔧 IMPROVEMENTS — How can the code be optimized?
    5. ✨ BEST SOLUTION — Show the optimal solution with explanation
    6. 📊 SCORE — Rate the solution out of 100
    
    Respond in {language} language only.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"review": response.choices[0].message.content}