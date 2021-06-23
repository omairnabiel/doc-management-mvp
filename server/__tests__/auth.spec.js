const request = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(true) // mock connection to mongoo
jest.mock('node-cron', () => {
	return {
		schedule: jest.fn(),
	}
})

const app = require('../app')
const User = require('../models/Users')

beforeAll(() => jest.useFakeTimers())
beforeEach(() => jest.useFakeTimers())

describe('POST /signup', () => {
	it('should return 400 status if no body is supplied', async () => {
		const response = await request(app).post('/signup').send()
		expect(response.status).toBe(400)
	})

	it('should return 409 if user already exists', async () => {
		jest.spyOn(User, 'findOne').mockResolvedValueOnce({exists: true})
		const response = await request(app).post('/signup').send({email: 'example@example.com', password: 'letmepass'})
		expect(response.status).toBe(409)
	})

	it('should create a new User if doesnt exist, status 201', async () => {
		jest.spyOn(User, 'findOne').mockResolvedValueOnce(null)
		const save = jest.spyOn(User, 'create').mockResolvedValueOnce(true)
		const response = await request(app).post('/signup').send({email: 'example@example.com', password: 'letmepass'})
		expect(save).toHaveBeenCalled()
		expect(response.status).toBe(201)
	})
})

describe('POST /login', () => {
	it('should return 404 when no user is found', async () => {
		jest.spyOn(User, 'findOne').mockResolvedValueOnce(null)
		const response = await request(app).post('/login').send({email: 'exmaple@example.com', password: 'letmepass'})
		expect(response.status).toBe(404)
	})

	it('should return 401 for wrong password', async () => {
		jest.spyOn(User, 'findOne').mockResolvedValueOnce({password: bcrypt.hashSync('dontletmepass', 10)})
		const response = await request(app).post('/login').send({email: 'example@example.com', password: 'letmepass'})
		expect(response.status).toBe(401)
	})

	it('should all login with correct password', async () => {
		jest.spyOn(User, 'findOne').mockResolvedValueOnce({password: bcrypt.hashSync('letmepass', 10)})
		const response = await request(app).post('/login').send({email: 'example@example.com', password: 'letmepass'})
		expect(response.status).toBe(200)
	})
})
