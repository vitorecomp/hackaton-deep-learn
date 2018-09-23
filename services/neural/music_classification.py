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

	sp = spotipy.Spotify(auth='BQBknton4DmVtIQ3h6d-EpLhKPZf9FjBaZ4NrdGlR-DZvvGd7EChocrPzrcYUW2wRiqVFyh7s_QbHM3REuK2qHsLc0cDxEi9MKoI_b7K8wypQCJQFTpP_uxtW3aU0WJjcbDO_szd5VQgrVuAPnNIJ_9UqLKuUU_3IKzelHF2GVA57BFQWC8_V73jTEzG')

	for musicap in musics:
		if(musicap.hasId()):
			print 'already has'
		music = musicap.toObject() 
		results = sp.search(q='track:' + music['nome'] +' artist:' + music['artist'] , type='track')
		#if(not results['tracks']):
		#	pass
			#set para nao buscar a musica
		lista = results['tracks']['items']
		print json.dumps(lista[0], indent=4, sort_keys=True)
		#busca a musica no spotify e salva o genero
		#se o spotify tiver caido, lascou tudo, e finaliza o programa
		

if __name__ == "__main__":
	main()
