from os import walk
import h5py
import numpy as np
import spotipy
import json

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

	musics = session.query(Music).all()

	sp = spotipy.Spotify(auth='BQDyNpPgcHMWLbwUH_cIxYikmsJ79otlNpNvr-pcOT-iAcB_lhF44_JmzTvwUXHohfhIiIYHp33WyOkAkiKa3_4GFKUjaQGHH3Uh4A4HRXsCN2aK99IjW2pw0M9j_i7ZOP-XK4RAGFHfohJ0lVft2fY7ZKZANKbZnE3PQW0T19nyV9UQd5IZ6WWt-nee')

	for music in musics:
		if(music.hasActivity()):
			print 'already has'
		results = sp.search(q='track:Otherside artist:Red hot', type='track')
		print json.dumps(results, indent=4, sort_keys=True)
		#busca a musica no spotify e salva o genero
		#se o spotify tiver caido, lascou tudo, e finaliza o programa
		

if __name__ == "__main__":
	main()
