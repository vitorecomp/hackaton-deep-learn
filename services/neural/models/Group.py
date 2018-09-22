from sqlalchemy import Column, Integer, String, Numeric
from config.Database import Base


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True)

    algotirth = Column(String)

    def __repr__(self):
        return "music"
