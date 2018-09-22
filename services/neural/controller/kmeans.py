def Kmeans():

	def split(musics):
		for i in musics:
			i.valor = i.valor + 50
		seeds = []
		for i in range(0, 6):
			seeds.append(np.random.rand(12) * 50)

		for j in range(0, 10)
			for music in musics:
				music.setGroup(Kmeans.getdiff(music, seeds))
			return Kmeans.redefineGroups(musics)

	def getdiff(music, seeds):
		mindiff = 1000000
		i  = 0
		group = 0
		for seed in seeds:
			diff = np.diff(seed, music)
			diff = np.sum(diff)
			if(diff < mindiff):
				mindiff = diff
				group = i
			i = i + 1

	def redefineGroups(music):
		return []