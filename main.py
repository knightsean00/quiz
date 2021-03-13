import uvicorn
import json
import os
import random
from helper import answer_check

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

with open("questions.json", "r") as f:
    question_bank = json.load(f)

class Guess(BaseModel):
    guesses: dict


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


@app.get("/api/questions/")
def get_questions():
    # Shuffle questions before they are sent out
    out = []
    for q in question_bank:
        to_append = {"question": q["question"], "choices": random.sample(q["choices"], len(q["choices"])), "id": q["id"]}
        out.append(to_append)
    random.shuffle(out)
    return out

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
        port = int(os.getenv("PORT"))
    
    uvicorn.run("main:app", port=port, reload=True)