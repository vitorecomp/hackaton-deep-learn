const express = require('express')
const app = express()
const port = 3000

let fun = async function(){
	let seq = await require('./config/db')
	global.db = seq.db
	global.models = seq.models
	const Music = seq.models.Music
		

	app.get('/musics', async (req, res) => {
		let musicas = await Music.findAndCountAll({})
		console.log(musicas)

		return res.json({
			music: {
				nome: 'valor'
			},
			humor: 'feliz'
		})
	})

	app.use(express.static('public'))


	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

fun()

