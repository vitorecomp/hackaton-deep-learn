const sequelize = require('sequelize')
const { db_name,
	db_username,
	db_password,
	db_host,
	db_port,
	db_ssl } = require('./config')

module.exports = async function () {
	const seq = {}
	seq.db = new sequelize(
		db_name,
		db_username,
		db_password,
		{
			host: db_host,
			port: db_port,
			dialect: 'postgres',
			dialectOptions: {
				ssl: false
			},
			pool: {
				max: 15,
				min: 0,
				idle: 10000
			},
			logging: false
		})


	try {
		await seq.db.authenticate()
		console.info('Conectado ao banco de dados')
	} catch (e) {
		console.error('Erro ao conectar ao banco de dados:', e)
		process.exit(0)
	}

	seq.models = {}

	//integrated
	seq.models.Music = await seq.db
		.import('../src/models/music.model.js')
	return seq
}()
