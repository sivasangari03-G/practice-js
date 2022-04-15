const mongoose = require('mongoose');

//step 2) create a schema
//user schema
const userSchema = new mongoose.Schema(
	{
		id: { type: Number, require: false },
		first_name: { type: String, require: true },
		last_name: { type: String, require: true },
		email: { type: String, require: true },
		gender: { type: String, require: false, default: "Male" }, // if user didnt mention gender field mongoose will not throw error at the same time it will default fill gender as "Male"
		age: { type: Number, require: true },
		id_address: { type: String, require: false },
	},
	{
		versionKey: false, // removes __v
		timestamps: true, // createdAt, updatedAt
	}
);

let User;
try {
	//* const User is var name but first letter should be caps.
	//* users is collection (Can use user or users mongoose will take care of singular and plural).
	//* userSchema is the variable which we used to create schema.
	//* mongoose.model is sync func no need of async await
	//* this will convert db.users.find to User.find
	//* in short User means db.users
	User = mongoose.model("users", userSchema);
} catch (e) {
	console.log(e.message);
}


module.exports = User;
