const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const schema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) throw new Error('Please enter a valid email')
		},
	},

	password: {
		type: String,
		required: true,
		minlength: 5,
	},
})

const User = mongoose.model('User', schema)

module.exports = User
