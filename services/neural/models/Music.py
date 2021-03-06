from sqlalchemy import Column, Integer, String, JSON
from config.Database import Base
import numpy as np


class Music(Base):
	__tablename__ = 'music'
	id = Column(Integer, primary_key=True)

	name = Column(String)
	artist = Column(String)

	activity_spoti = Column(String)
	activity_local = Column(String)
	
	valor = Column(JSON)

	sptid = Column(String)

	groupKmeans = Column(Integer)
	groupKonohen = Column(Integer)
	groupSpotidy = Column(Integer)
	
	def __init__(self, f1):
		print '-----------------------------------------'
		#print f1['metadata']['songs'][0]
		print f1['metadata']['songs'][0][9]
		print f1['metadata']['songs'][0][-2]
		self.name  = f1['metadata']['songs'][0][-2]
		self.artist = f1['metadata']['songs'][0][9]

		dataset = list(f1['analysis']['segments_timbre'])
		dataset = np.transpose(dataset)

		self.valor = []
		for data in dataset: 
			self.valor.append(np.mean(data))

	def hasId(self):
		if self.sptid == None:
			return False
		else:
			return True
			
	def setId(self, id):
		self.sptid = id
		
	def setGroup(self, group):
		self.groupKmeans = group

	def setGroupKon(self, group):
		self.groupKonohen = group
	
	def setGroupSpo(self, group):
		self.groupSpotify = group

	
	def setActvitySpotify(self, activity):
		self.activity = activity

	def toObject(self):
		obj = {}
		obj['id'] = self.id
		
		obj['nome'] = self.name
		obj['artist'] = self.artist

		obj['valor'] = self.valor
		obj['group'] = self.groupKmeans
		return obj
		

