from os import walk
import h5py
import numpy as np
from config.Database import Base
from config.Database import engine
from config.Database import Session

from models.Music import Music

from controller.kmeans import Kmeans

mypath = './dataset/datatr/'


def main():
	files = []

	# 2 - generate database schema
	Base.metadata.create_all(engine)

	# 3 - create a new session
	session = Session()

	musics = session.query(Music).all()

	splited, distances = Kmeans.split(musics)

	print distances

	return


if __name__ == "__main__":
	main()
