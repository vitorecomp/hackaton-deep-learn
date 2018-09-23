const express = require('express')
const app = express()
const port = 3000

let fun = async function(){
	let seq = await require('./config/db')
	global.db = seq.db
	global.models = seq.models
	const Music = seq.models.Music
		

	app.get('/musics', async (req, res) => {
		let musicas = await Music.findAndCountAll({
			where:{
				token : {
					$and:{
						$ne: null,
						$ne: 'nao'
					}
				  }
			}
		})

		// console.log(musicas.count)
		// for(let i = 0; i < musicas.count; i++){
		// 	console.log(musicas.rows[i].dataValues.token)
		// }

		let num = Math.floor(Math.random() * musicas.count)
		return res.json(JSON.parse(musicas.rows[num].dataValues.token))
	})

	app.use(express.static('public'))


	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

fun()

