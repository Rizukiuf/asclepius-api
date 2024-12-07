const express = require('express');
const multer = require('multer');
const predictController = require('../controller/predict-controller');

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024, //max file size 1MB
	}
});

const predictRouter = new express.Router();

predictRouter.post('', upload.single('image'), predictController.predict);
predictRouter.get('/histories', predictController.getHistories);

module.exports = {
	predictRouter,
};