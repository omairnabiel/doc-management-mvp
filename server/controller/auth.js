const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')
const ApiError = require('../helpers/error')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
	const {email, password} = req.body

	if (!email || !password) {
		next(ApiError.emptyBody('Empty request body missing email, password'))
		return
	}

	// check if user with same email already exists
	const exists = await User.findOne({email: email})
	if (exists) {
		next(ApiError.duplicateResource('User already Exists'))
		return
	}

	const hash = bcrypt.hashSync(password, 10)
	try {
		await User.create({email, password: hash})
		return res.status(201).json('User created')
	} catch (error) {
		console.log('Error saving user', error)
		res.status(500).json(error)
	}
})

router.post('/login', async (req, res, next) => {
	const {email, password} = req.body

	const user = await User.findOne({email: email})
	if (!user) {
		next(ApiError.notFound('User not found'))
		return
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password)
	if (!isPasswordValid) {
		next(ApiError.unAuthorized('Invalid password'))
		return
	}

	const token = jwt.sign({email: user.email, id: user._id}, 'supersecret')
	res.status(200).json({token})
})

router.post('/logout', async (req, res, next) => {})
module.exports = router
