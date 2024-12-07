const express = require('express');
const cors = require('cors');
const { predictRouter } = require('../route/api');
const { errorMiddleware } = require('../middleware/error-middleware');

const web = express();

const corsOptions = {
	origin: 'https://submissionmlgc-rizkiutamafauzi.et.r.appspot.com',
	optionsSuccessStatus: 200
}
web.use(cors(corsOptions));

web.use(express.json());

web.use('/predict', predictRouter);

web.use(errorMiddleware);

module.exports = web;