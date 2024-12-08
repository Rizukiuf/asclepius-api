const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const storeData = async (collection = 'predictions', data) => {
	const document = firestore.collection(collection).doc();
	const id = document.id;
	await document.set({
		id: id,
		...data
	});

	return id;
};

const getData = async (collection = 'predictions') => {
	const snapshot = await firestore.collection(collection).get();
	const data = snapshot.docs.map((doc) => {
		return {
			id: doc.id,
			history: doc.data()
		};
	});

	return data;
}

module.exports = {
	storeData,
	getData
};