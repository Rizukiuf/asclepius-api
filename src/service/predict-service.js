const tfjs = require('@tensorflow/tfjs-node');
const { ResponseError } = require('../error/response-error');
const { storeData, getData } = require('../application/firestore');

const predict = async (req) => {

	if (!req.file || !req.file.buffer) {
		throw new ResponseError(400, 'Terjadi kesalahan dalam melakukan prediksi');
	}

	const model = req.app.locals.model;
	const imageBuffer = req.file.buffer;

	const image = tfjs.node.decodeImage(imageBuffer).resizeNearestNeighbor([224, 224]).toFloat().expandDims();

	if (image.shape[3] !== 3) {
		throw new ResponseError(400, 'Terjadi kesalahan dalam melakukan prediksi');
	}

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
	const id = await storeData('predictions', { ...data, createdAt });

	return {
		id,
		...data,
		createdAt
	};
};

const getHistories = async (req, res, next) => {
	const histories = await getData('predictions');

	return histories;
}

module.exports = {
	predict,
	getHistories
};