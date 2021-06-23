const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandlerMiddleware = require('./middleware/error')
const nodeCron = require('node-cron')
const Document = require('./models/Documents')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://Omair:Xendit@cluster0.x0plf.mongodb.net/xendit-db?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
})

app.use('/', require('./controller/auth'))
app.use('/', require('./controller/document'))

// cron to AutoClean DB after 24 hours
nodeCron.schedule(' 0 0 */24 * * *', async function () {
	const date = new Date()

	try {
		const documents = await Document.find({
			isDeleted: true,
			deletedAt: {
				$lte: date.setDate(date.getDate() - 1),
			},
		})
		const docRemovePromises = documents.map(doc => doc.remove())
		await Promise.all(docRemovePromises)
		console.log('DB AutoClean Succsessful')
	} catch (error) {
		console.log('Error occured while Auto Cleaning DB')
	}
})

app.use(errorHandlerMiddleware)
module.exports = app
