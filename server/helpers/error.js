class ApiError {
	constructor(code, message) {
		this.code = code
		this.message = message
	}

	static customError(code, msg) {
		return new ApiError(code, msg)
	}
	static emptyBody(msg) {
		return new ApiError(400, msg)
	}

	static notFound(msg) {
		return new ApiError(404, msg)
	}

	static duplicateResource(msg) {
		return new ApiError(409, msg)
	}

	static unAuthorized(msg) {
		return new ApiError(401, msg)
	}

	static invalidToken(msg = 'Invalid token') {
		return new ApiError(401, msg)
	}
}

module.exports = ApiError
