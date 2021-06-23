const app = require('./app')

const PORT = 3001

app.listen(PORT, () => {
	console.log(`Node server running on localhost:${PORT}`)
})
