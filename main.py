import uvicorn
import json
import os
from helper import answer_check
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

with open("questions.json", "r") as f:
    question_bank = json.load(f)

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Guess(BaseModel):
    guesses: dict


@app.get("/api/questions/")
def get_questions():
    return [{"question": q["question"], "choices": q["choices"]} for q in question_bank]

@app.post("/api/check/")
def check(data: Guess):
    out = {}
    for k, g in data.guesses.items():
        answer = question_bank[int(k)]["answer"]
        out[int(k)] = [answer_check(answer, g), answer]
    return out
    
app.mount("/", StaticFiles(directory="client/build", html=True), name="client")

if __name__ == "__main__":
    port = 3030
    if os.getenv("PORT"):
        port = os.getenv("PORT")
    
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True, interface="wsgi")