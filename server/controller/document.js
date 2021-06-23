const express = require('express')

const Document = require('../models/Documents')
const ApiError = require('../helpers/error')

const authMiddleware = require('../middleware/auth')

const router = express.Router()

// create document
router.post('/document', authMiddleware, async (req, res, next) => {
	const {name, email, phone, address, ktpNumber, npwpNumber, passportNumber} = req.body

	if (!email) {
		next(ApiError.emptyBody('Params missing, "email" is required'))
		return
	}

	if (!name) {
		next(ApiError.emptyBody('Params missing, "name" is required'))
		return
	}

	try {
		await Document.create({name, email, phone, address, ktpNumber, npwpNumber, passportNumber, userId: req.user.id})
	} catch (error) {
		console.log('Error creating Document', error)
		next(ApiError.customError(500, error))
		return
	}

	res.status(201).json('Document created')
})

// get all documents
router.get('/document', authMiddleware, async (req, res, next) => {
	const {id: userId} = req.user

	try {
		const documents = await Document.find({userId, isDeleted: null})
		res.status(200).json(documents)
	} catch (error) {
		next(ApiError.customError(500, error))
	}
})

// get document by id
router.get('/document/:id', authMiddleware, async (req, res, next) => {
	const {id: userId} = req.user
	const {id} = req.params

	try {
		const document = await Document.find({userId, _id: id, isDeleted: null})
		res.status(200).json(document)
	} catch (error) {
		next(ApiError.customError(500, error))
	}
})

// delete document by id
router.delete('/document/:id', async (req, res, next) => {
	const {id} = req.params

	try {
		await Document.updateOne({_id: id}, {isDeleted: true, deletedAt: new Date()})
		return res.status(200).json('Document Deleted Successfully')
	} catch (error) {
		next(ApiError.customError(500, error))
	}
})

// update document
router.put('/document/:id', async (req, res, next) => {
	const {id} = req.params
	try {
		await Document.updateOne({_id: id, isDeleted: null}, req.body)
		return res.status(201).json('Document Updated')
	} catch (error) {
		next(ApiError.customError(500, error))
	}
})

module.exports = router
