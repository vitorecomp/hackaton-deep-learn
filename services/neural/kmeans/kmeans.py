import numpy as np
from scipy.spatial import distance

style = 'kmeans_man'
#style = None

class Kmeans:
	@staticmethod
	def split(musicsDB):
		musics = []
		for i in musicsDB:
			musics.append(i.toObject())

		for i in musics:
			i['valor'] = i['valor'] + np.array(200)

		seeds = []
		for i in range(0, 6):
			seeds.append(np.random.rand(12) * 400)

		if style == 'kmeans_man':
			for i in range(0, 50):
				print 'Loop ' + str(i)
				for music in musics:
					music['group'] = Kmeans.getdiff(music, seeds)
				seeds = Kmeans.redefineGroups(musics)
		else:
			pass

		for i in range(0, len(musicsDB)):
			musicsDB[i].setGroup(musics[i]['group'])

		return musicsDB, []

	@staticmethod
	def getdiff(music, seeds):
		mindiff = 1000000
		i  = 0
		group = 0
		for seed in seeds:
			diff = distance.euclidean(seed, music['valor'])
			if diff < mindiff:
				mindiff = diff
				group = i
			i = i + 1
		return group

	@staticmethod
	def redefineGroups(musics):
		seeds = []
		for i in range(0, 6):
			seed = {}
			seed['valor'] = np.zeros(12)
			seed['num'] = 0
			seeds.append(seed)

		for music in musics:
			seed = seeds[music['group']]
			seed['valor'] = seed['valor'] + music['valor']
			seed['num'] = seed['num'] + 1
			seeds[music['group']] = seed
		
		seedsf = []
		for i in range(0, 6):
			if seeds[i]['num'] == 0:
				continue
			seedsf.append(seeds[i]['valor']/seeds[i]['num'])
		return seedsf