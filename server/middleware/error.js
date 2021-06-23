const ApiError = require('../helpers/error')

function errorHandler(error, req, res, next) {
	if (error instanceof ApiError) {
		res.status(error.code).json(error.message)
		return
	}
	res.status(500).json('Something went wrong')
}

module.exports = errorHandler
