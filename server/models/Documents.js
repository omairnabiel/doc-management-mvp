const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},

	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) throw new Error('Please enter a valid email')
		},
	},

	phone: {
		type: String,
		minlength: 5,
		default: null,
	},

	address: {
		type: String,
		default: null,
	},

	passportNumber: {
		type: String,
		index: {
			unique: true,
			sparse: true,
		},
		default: null,
	},

	ktpNumber: {
		type: Number,
		index: {
			unqiue: true,
			sparse: true,
		},
		default: null,
	},

	npwpNumber: {
		type: Number,
		default: null,
	},

	isDeleted: {
		type: Boolean,
		default: null,
	},

	deletedAt: {
		type: Date,
		default: null,
	},
})

schema.index({ktpNumber: 1}, {unique: true, partialFilterExpression: {ktpNumber: {$type: 'number'}}})
schema.index({passportNumber: 1}, {unique: true, partialFilterExpression: {passportNumber: {$type: 'string'}}})

const Document = mongoose.model('Document', schema)

module.exports = Document
