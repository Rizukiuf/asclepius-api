const web = require('./application/web');
const dotenv = require('dotenv');
const loadModel = require('./application/model');

dotenv.config();

loadModel().then((model) => {
	web.locals.model = model;
});

const port = 3000;
web.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});