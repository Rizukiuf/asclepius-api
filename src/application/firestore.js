const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const storeData = async (collection = 'predictions', data) => {
	const document = firestore.collection(collection).doc();
	await document.set(data);

	return document.id;
};

module.exports = storeData;