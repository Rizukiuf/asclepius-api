const express = require('express');
const { predictRouter } = require('../route/api');
const { errorMiddleware } = require('../middleware/error-middleware');

const web = express();
web.use(express.json());

web.use('/predict', predictRouter);

web.use(errorMiddleware);

module.exports = web;