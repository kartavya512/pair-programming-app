from fastapi import APIRouter

router = APIRouter(prefix="/autocomplete", tags=["Autocomplete"])

@router.post("/")
def autocomplete(data: dict):
    return {"suggestion": "print('Hello from AI!')"}
