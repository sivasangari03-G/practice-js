const mongoose = require('mongoose')

//post schema
//connecting user with post
//one to many relationship
//one post can have one user but one user cannot have many post
// user is parent and post is child
const postSchema = new mongoose.Schema(
	{
		title: { type: String, require: true },
		body: { type: String, require: true },
		//users is collection name which is inside newdb
		//this is to relate post with user ref: users is refering userScheme. users word should be same as what we defined in model
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			require: true,
		},
		//it should be inside array bcz there will be multiple tags
		tags_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
	},
	{
		versionKey: false, // removes __v
		timestamps: true, // createdAt, updatedAt
	}
);

//post model
let Post;
try {
	//"post" is collection name which will mongo create it if we dont have that collection
	Post = mongoose.model("post", postSchema);
} catch (e) {
	console.log(e.message);
}

module.exports = Post;