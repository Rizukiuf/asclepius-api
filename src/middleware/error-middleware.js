const multer = require('multer');
const { ResponseError } = require('../error/response-error');
const { sendErrorResponse } = require('../utils/response-helpers');

const errorMiddleware = (error, request, response, next) => {
	if (!error) {
		next();
		return;
	}

	if (error instanceof multer.MulterError) {
		sendErrorResponse(response, 413, 'Payload content length greater than maximum allowed: 1000000');
	}

	if (error instanceof ResponseError) {
		sendErrorResponse(response, error.status, error.message);
	} else {
		sendErrorResponse(response, 500, error.message);
	}
};

module.exports = { errorMiddleware };