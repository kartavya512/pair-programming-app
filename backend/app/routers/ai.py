from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class CodeRequest(BaseModel):
    code: str

@router.post("/ai/autocomplete")
def autocomplete(req: CodeRequest):
    return {
        "suggestions": [
            "def calculate_sum(a, b):",
            "    return a + b",
            "# TODO: optimize later"
        ]
    }
