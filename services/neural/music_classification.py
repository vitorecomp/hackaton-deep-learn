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

	sp = spotipy.Spotify(auth='BQDi9f9WdBZVDBvK6OL2COokG_oA_DGp0SYk2VCBiQgErSWdbaiQB0P4dOpAcdGrsLz45b5uwTu9R9gzutyDm6HsYrV6assT5Nki2cuV9TXg1JELZxgoN1QzM0VaDhLbgR23JF2h8tUHnUba49wDnxnSY-lFND1otF8JWl_NUqWd3oMh7TB7T3mpPkWQ')

	for musicap in musics:
		if(musicap.hasId()):
			print 'already has'
			continue
		music = musicap.toObject() 
		results = sp.search(q='track:' + music['nome'] +' artist:' + music['artist'] , type='track')
		
		if(len(results['tracks']['items']) == 0):
			musicap.setId('nao')
			print 'final'
			session.commit()
			continue
		print 'ok'
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
