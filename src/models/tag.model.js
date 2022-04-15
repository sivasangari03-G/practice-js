const mongoose = require('mongoose')

//Tag schema
//connecting Tag with post
//many to many relationship
//one post can have many tags and also one tag cannot have many posts
//both depend on each other so we can put tag_id inside post or vice-versa
// but if we take stackoverflow one tag can have 1million ques but one question cannot have more than 100 tags
// so maintain tag is better
//so take tag as parent and post as child
const tagSchema = new mongoose.Schema(
	{
		//tag should be unique inside one content
		name: { type: String, require: true },
	},
	{
		versionKey: false, // removes __v
		timestamps: true, // createdAt, updatedAt
	}
);

let Tag;
try {
	//"tag" is collection name which will mongo create it if we dont have that collection
	Tag = mongoose.model("tag", tagSchema);
} catch (e) {
	console.log(e.message);
}

module.exports = Tag;