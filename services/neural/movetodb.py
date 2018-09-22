from os import walk
import h5py
import numpy as np
from config.Database import Base
from config.Database import engine
from config.Database import Session

from models.Music import Music

mypath = './dataset/datatr/'


def main():
	files = []

	# 2 - generate database schema
	Base.metadata.create_all(engine)

	# 3 - create a new session
	session = Session()


	for (filenames) in walk(mypath):
		files.append(filenames)

	files = files[0][2]

	for filename in files:
		f1 = h5py.File(mypath + filename, 'r+')
		#look for artist
		
		music = Music(f1)
		session.add(music)
		session.commit()
	
	return


if __name__ == "__main__":
	main()
