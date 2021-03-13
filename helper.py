from fastapi import HTTPException

def answer_check(answer, guess):
    try:
        if isinstance(answer, bool):
            guess = guess.lower() == "true"
        else:
            guess = type(answer)(guess)
        return answer == guess
    except:
        raise HTTPException(
                status_code = 406,
                detail=f"Your answer must be a {type(answer).__name__}."
            )