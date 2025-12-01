from sqlalchemy import Column, String, Text
from app.database import Base

class Room(Base):
    __tablename__ = "rooms"

    room_id = Column(String(100), primary_key=True)
    name = Column(String(200))
    code = Column(Text)


