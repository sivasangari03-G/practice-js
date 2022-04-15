const mongoose = require("mongoose");

//step 1) connect express with mongoDB
const connect = () => {
	// this is async func
	//   use this url to connect in composs to import data
	return mongoose.connect(
		"mongodb+srv://sivasangari:zero1234@cluster0.gzful.mongodb.net/newdb?retryWrites=true&w=majority"
	);
};

module.exports = connect;
