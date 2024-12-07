const tfjs = require('@tensorflow/tfjs-node');

const loadModel = async () => {
	return await tfjs.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;