const express = require("express");
const router = express.Router();

const Post = require("../models/post.model");


router.get("", async (req, res) => {
	//.lean will convert mongoose obj to json obj
	//.exec will convert thennable to proper then basically it will return proper promise
	//bcoz mongoose doesnt know what is that last func that is going to be called so use .exec()
	// this is basically db.users.find()
	try {
		const posts = await Post.find()
			//.populate("user_id") //this will return all the info
			.populate({ path: "user_id", select: ["first_name", "last_name"] }) //this will return only first name and last name
			.populate("tags_ids")
			.lean()
			.exec();
		return res.send(posts); //return is not mandatory
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		//findById is provided by mongoose which return the document which match the url id
		//since this return a promise we need to use lean and exec
		const post = await Post.findById(req.params.id).lean().exec();
		//if we need to find by first name
		//in get "/users/:name"
		// const user = await User.find({"first_name": req.params.name}).lean().exec();
		return res.status(200).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("", async (req, res) => {
	try {
		//express doesnt know how to read json data so use middleware app.use(express.json());
		const post = await Post.create(req.body);
		return res.status(201).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		//findByIdAndUpdate provided by mongoose it will take 2 parameter (where to update, what to update)
		// new : true is for, to update the doc immediately and return that new doc in patch req and also in get req
		//but without new: true we will get updated doc in get req but not in patch req
		// const tag = await Tag.findByIdAndUpdate(req.params.id, req.body);

		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(201).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
		//delete all doc whose age is equal to 30
		// const user = await User.deleteMany({age: 30}).lean().exec();
		res.status(201).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


module.exports = router;