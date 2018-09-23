from sqlalchemy import Column, Integer, String, JSON
from config.Database import Base
import numpy as np


class Music(Base):
	__tablename__ = 'music'
	id = Column(Integer, primary_key=True)
	name = Column(String)
	valor = Column(JSON)
	groupn = Column(Integer)
	
	def __init__(self, f1):
		self.name  = f1['metadata']['songs'][0][-2]
		print self.name

		dataset = list(f1['analysis']['segments_timbre'])
		dataset = np.transpose(dataset)

		self.valor = []
		for data in dataset: 
			self.valor.append(np.mean(data))

	def setGroup(self, group):
		self.groupn = group
		
	def toObject(self):
		obj = {}
		obj['id'] = self.id
		obj['nome'] = self.name
		obj['valor'] = self.valor
		obj['group'] = self.groupn
		return obj
		

