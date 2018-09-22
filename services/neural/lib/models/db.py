from sqlalchemy import create_engine


def init():
    return create_engine('sqlite://../db/model', echo=True)
