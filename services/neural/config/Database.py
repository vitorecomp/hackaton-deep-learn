from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://postgres:postgres@192.168.64.2:5432/sqlalchemy')
Session = sessionmaker(bind=engine)

Base = declarative_base()
