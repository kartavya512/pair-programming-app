from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from uuid import uuid4

from app.database import SessionLocal
from app.models.room import Room

router = APIRouter(prefix="/rooms", tags=["Rooms"])

class CreateRoomRequest(BaseModel):
    name: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_room(req: CreateRoomRequest, db: Session = Depends(get_db)):
    new_room_id = str(uuid4())

    new_room = Room(
        room_id=new_room_id,
        name=req.name,
        code=""
    )

    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return {
        "roomId": new_room_id,
        "name": req.name
    }


@router.get("/")
def list_rooms(db: Session = Depends(get_db)):
    rooms = db.query(Room).all()
    return rooms


@router.get("/{room_id}")
def get_room(room_id: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_id == room_id).first()

    if not room:
        return {"message": "Room not found"}

    return room
