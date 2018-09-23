import numpy as np
from som import SOM
import matplotlib.pylab as plt

import scipy.cluster.hierarchy as sch
from sklearn.cluster import AgglomerativeClustering

def run(data):

	som = SOM(30, 30)  # initialize the SOM
	som.fit(data, 20000)  # fit the SOM for 2000 epochs
	
	#targets = len(data) * [0]   # create some dummy target values
	# vizualizando as paradas, ver se pego o que eu precido
	# som.plot_point_map(data, targets, ['class 1', 'class 2'], filename='./results/som.png')
	# som.plot_class_density(data, targets, 0, filename='./results/class_0.png', names=['a', 'b', 'c'], mode)
	# som.plot_density_map(data, filename='som1.png')

	#preparando para clusterizar, denovo
	winners = som.winner_map(data)
	#plt.imshow(winners, interpolation='nearest', extent=(0.5,10.5,0.5,10.5))
	#plt.colorbar()
	#plt.show()

	points = []
	for i in range(0, len(winners)):
		for j in range(0, len(winners[0])):
			points.append([i, j, winners[i][j]])
	
	# create dendrogram para imprimir
	#dendrogram = sch.dendrogram(sch.linkage(points, method='ward'))

	# create clusters
	hc = AgglomerativeClustering(n_clusters=6, affinity = 'euclidean', linkage = 'ward')
	# save clusters for chart
	y_hc = hc.fit_predict(points)

	for j in range(0, len(y_hc)):
		point  = points[j]
		winners[point[0], point[1]] = y_hc[j]

	#vizualizando a qualidade da clusterizacao
	#plt.matshow(winners)
	#plt.show()