const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decode = await jwt.verify(token, 'supersecret')
		const user = await User.findOne({_id: decode.id})
		if (!user) throw new Error('User Not found')
		req.token = token
		// add user to the request object
		req.user = {id: user._id, email: user.email}
		next()
	} catch (e) {
		console.log('Error', e)
		res.status(401).send({error: e})
	}
}

module.exports = auth
