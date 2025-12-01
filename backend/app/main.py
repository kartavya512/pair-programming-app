from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import rooms, autocomplete
from fastapi import WebSocket, WebSocketDisconnect
from app.services.ws_manager import ws_manager
from app.database import SessionLocal
from app.models.room import Room
from app.routers import ai



app = FastAPI()
from app.database import Base, engine
Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rooms.router)
app.include_router(autocomplete.router)
app.include_router(ai.router, prefix="/api")


@app.get("/")
def home():
    return {"message": "Backend running!"}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await ws_manager.connect(room_id, websocket)

    db = SessionLocal()

    try:
        while True:
            data = await websocket.receive_text()

            # Save latest code to DB
            room = db.query(Room).filter(Room.room_id == room_id).first()

            if room:
                room.code = data
            else:
                room = Room(room_id=room_id, code=data)
                db.add(room)

            db.commit()

            # Broadcast code update to all clients in the room
            await ws_manager.broadcast(room_id, data)

    except WebSocketDisconnect:
        ws_manager.disconnect(room_id, websocket)
        db.close()
