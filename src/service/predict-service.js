const tfjs = require('@tensorflow/tfjs-node');
const { ResponseError } = require('../error/response-error');
const storeData = require('../application/firestore');

const predict = async (req) => {

	if (!req.file) {
		throw new ResponseError(400, 'Image file is required');
	}

	const model = req.app.locals.model;
	const imageBuffer = req.file.buffer;

	// check channel
	if (imageBuffer.length % 3 !== 0) {
		throw new ResponseError(400, 'Terjadi kesalahan dalam melakukan prediksi');
	}

	const image = tfjs.node.decodeImage(imageBuffer, 3).resizeNearestNeighbor([224, 224]).toFloat().expandDims();

	const prediction = model.predict(image);
	const predictionData = (await prediction.data())[0];

	const createdAt = new Date().toISOString();

	const classes = ['Cancer', 'Non-cancer'];

	let data;
	if (predictionData > 0.5) {
		data = {
			result: classes[0],
			suggestion: 'Segera periksa ke dokter!'
		};
	} else {
		data = {
			result: classes[1],
			suggestion: 'Penyakit kanker tidak terdeteksi.'
		};
	}

	// store to firestore
	const id = await storeData('predictions', data);

	return {
		id,
		...data,
		createdAt
	};
};

const getHistories = async (req, res, next) => {
	try {
		const histories = await storeData('predictions');
		return histories;
	} catch (error) {
		next(error);
	}
}

module.exports = {
	predict,
	getHistories
};