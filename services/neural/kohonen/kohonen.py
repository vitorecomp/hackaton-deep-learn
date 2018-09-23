import numpy as np
from som import SOM

def run(data):

	som = SOM(10, 10)  # initialize the SOM
	som.fit(data, 4000)  # fit the SOM for 2000 epochs
	
	targets = range(0, len(data))  # create some dummy target values

	# now visualize the learned representation with the class labels
	som.plot_point_map(data, targets, ['class 1', 'class 2'], filename='som.png')
	som.plot_class_density(data, targets, 0, filename='class_0.png', names=['a', 'b', 'c'])