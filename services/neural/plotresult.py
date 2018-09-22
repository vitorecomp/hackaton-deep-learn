from os import walk
import h5py
import numpy as np
from config.Database import Base
from config.Database import engine
from config.Database import Session

from models.Music import Music

mypath = './dataset/datatr/'


def main():
	# 2 - generate database schema
	Base.metadata.create_all(engine)

	# 3 - create a new session
	session = Session()

	movies = session.query(Music).all()

	print movies
	
	return


if __name__ == "__main__":
	main()
