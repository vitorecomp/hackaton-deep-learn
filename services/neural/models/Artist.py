from sqlalchemy import Column, Integer, String
from config.Database import Base


class Artist(Base):
    __tablename__ = 'music'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)

    def __repr__(self):
        return "music"
