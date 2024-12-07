const predictService = require('../service/predict-service');
const { sendSuccessResponse } = require('../utils/response-helpers');

const predict = async (req, res, next) => {
	try {
		const prediction = await predictService.predict(req);
		sendSuccessResponse(res, prediction, 201, 'Model is predicted successfully');

	} catch (error) {
		next(error);
	}
};

const getHistories = async (req, res, next) => {
	try {
		const histories = await predictService.getHistories();
		sendSuccessResponse(res, histories, 200, 'Histories are retrieved successfully');
	} catch (error) {
		next(error);
	}
}

module.exports = {
	predict,
	getHistories
};