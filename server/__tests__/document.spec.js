const request = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// mock connection to mongoo
jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(true)

// mock middleware
jest.mock('../middleware/auth', () =>
	jest.fn((req, res, next) => {
		req.user = {id: '1', email: 'example@test.com'}
		next()
	})
)

// mock node-cron
jest.mock('node-cron', () => {
	return {
		schedule: jest.fn(),
	}
})

const app = require('../app')
const Document = require('../models/Documents')

beforeAll(() => jest.useFakeTimers())
beforeEach(() => jest.useFakeTimers())

describe('POST /document', () => {
	it('should return 400 status if no body is supplied, email and name are required', async () => {
		const response = await request(app).post('/document').send()
		expect(response.status).toBe(400)
	})

	it('should create document if required params are provided', async () => {
		jest.spyOn(Document, 'create').mockResolvedValueOnce(true)
		const response = await request(app).post('/document').send({name: 'name', email: 'test@test.com'})
		expect(response.status).toBe(201)
	})
})
