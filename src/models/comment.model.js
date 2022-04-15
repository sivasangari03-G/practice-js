const mongoose = require("mongoose");

//comment schema
//connecting post with comment
//one to many relationship
//one post can have many comment but one comment cannot have many post
//post is parent and comment to child
const commentSchema = new mongoose.Schema(
	{
		content: { type: String, require: true },
		post_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "post",
			require: true,
		},
	},
	{
		versionKey: false, // removes __v
		timestamps: true, // createdAt, updatedAt
	}
);

let Comment;
try {
	//"comment" is collection name which will mongo create it if we dont have that collection
	Comment = mongoose.model("comment", commentSchema);
} catch (e) {
	console.log(e.message);
}

module.exports = Comment;