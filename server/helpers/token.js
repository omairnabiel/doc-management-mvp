const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/env')

function verifyToken(req) {
	return new Promise((resolve, reject) => {
		const token = extractToken(req)

		jwt.verify(token, JWT_SECRET, function (err, decoded) {
			if (err) {
				reject(null)
				return
			}
			resolve(decoded)
		})
	})
}

function extractToken(req) {
	const bearer = req.header('Authorization').split(' ')

	if (!bearer || bearer.length < 2) {
		return null
	}

	return bearer[1]
}

module.exports = verifyToken
