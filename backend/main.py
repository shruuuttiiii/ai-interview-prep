from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io
from groq import Groq
from dotenv import load_dotenv
import os
import tempfile

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


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
    prompt = f"""
    Based on this resume, generate 5 interview questions:
    {resume_text}
    Mix technical and behavioral questions based on their skills.
    Format as numbered list only.
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
    return {"feedback": response.choices[0].message.content}