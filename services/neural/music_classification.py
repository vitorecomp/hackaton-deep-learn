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

	sp = spotipy.Spotify(auth='BQD6NGvR4Bck0MKu0MKLbdP5G2tvkLNBMxbxko8c523LjgjQcRJOI7ZBX3za5WVZ6wWfUwB1xleKXcBgvCg4Rw00Fu4k7zRa1F9lwj6g5_zxU6mPosRrtGUfYrFIltB5B4zufbuANJfxSR487BYfsd_oIotCpUCOVFadlLdlZTx7THPIELQzt3M5flwx')

	for musicap in musics:
		if(musicap.hasId()):
			print 'already has'
			continue
		music = musicap.toObject() 
		results = sp.search(q='track:' + music['nome'] +' artist:' + music['artist'] , type='track')
		print 'ok'
		if(len(results['tracks']['items']) == 0):
			print 'final'
			continue
		#if(not results['tracks']):
		#	pass
		#	set para nao buscar a musica
		lista = results['tracks']['items']

		valor = {}
		valor['context_uri'] = lista[0]['album']['uri']
		valor['offset'] = {}
		valor['offset']['position'] = lista[0]['track_number']
		
		musicap.setId(json.dumps(valor))
		#busca a musica no spotify e salva o genero
		#se o spotify tiver caido, lascou tudo, e finaliza o programa
		session.commit()
		

if __name__ == "__main__":
	main()
