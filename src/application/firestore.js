const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const storeData = async (collection = 'predictions', data) => {
	const document = firestore.collection(collection).doc();
	await document.set(data);

	return document.id;
};

const getData = async (collection = 'predictions') => {
	const snapshot = await firestore.collection(collection).get();
	const data = snapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data()
		};
	});

	return data;
}

module.exports = {
	storeData,
	getData
};