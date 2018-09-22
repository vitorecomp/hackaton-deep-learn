const express = require('express')
const app = express()
const port = 3000

app.get('/musics', (req, res) => {
	return res.json({
		music: {
			nome: 'valor'
		},
		humor: 'feliz'
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))