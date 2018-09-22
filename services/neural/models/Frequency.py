from sqlalchemy import Column, Integer, String, Numeric
from config.Database import Base


class Fequecy(Base):
    __tablename__ = 'music'
    id = Column(Integer, primary_key=True)
    activity_workh = Column(Numeric)
    activity_relax = Column(Numeric)
    activity_excer = Column(Numeric)
    activity_conce = Column(Numeric)
    activity_party = Column(Numeric)
    activity_sleep = Column(Numeric)

    algotirth = Column(String)

    def __repr__(self):
        return "music"
