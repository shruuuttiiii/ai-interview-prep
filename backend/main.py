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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
    prompt = f"""
    The candidate was asked these interview questions:
    {questions}

    Their answer was:
    {answer}

    Please provide:
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
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"ideal_answer": response.choices[0].message.content}