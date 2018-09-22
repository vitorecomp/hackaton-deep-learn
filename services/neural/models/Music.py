from sqlalchemy import Column, Integer, String, JSON
from config.Database import Base
import numpy as np

class Music(Base):
	__tablename__ = 'music'
	id = Column(Integer, primary_key=True)
	name = Column(String)
	valor = Column(JSON)
	group = 0
	
	def __init__(self, f1):
		self.name  = f1['metadata']['songs'][0][-2]
		print self.name

		dataset = list(f1['analysis']['segments_timbre'])
		dataset = np.transpose(dataset)

		self.valor = []
		for data in dataset: 
			self.valor.append(np.mean(data))
		
	def toObject(self):
		return {
			nome:self.valor,
			valor:self.valor,
			group:self.group
		}
		

