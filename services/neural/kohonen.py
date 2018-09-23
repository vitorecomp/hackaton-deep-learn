from os import walk
import h5py
import numpy as np
import spotipy
import json

from config.Database import Base
from config.Database import engine
from config.Database import Session
from models.Music import Music

from kohonen.kohonen import run

def main():

	# 2 - generate database schema
	Base.metadata.create_all(engine)

	# 3 - create a new session
	session = Session()

	musics = session.query(Music).all()

	data = []
	for music in musics:
		data.append(music.toObject()['valor'])
		
	data = np.array(data).reshape(len(data), 12)
	
	run(data, musics)

	session.commit()
		

if __name__ == "__main__":
	main()
