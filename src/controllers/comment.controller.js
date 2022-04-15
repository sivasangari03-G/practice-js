const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model");

router.get("", async (req, res) => {
	//.lean will convert mongoose obj to json obj
	//.exec will convert thennable to proper then basically it will return proper promise
	//bcoz mongoose doesnt know what is that last func that is going to be called so use .exec()
	// this is basically db.users.find()
	try {
		//populate will display all the fields inside that post_id rather than displaying only id
		const comments = await Comment.find()
			// .populate({ path: "post_id", populate: { path: "user_id" }, populate: { path: "tags_ids" } })
			.populate({
				path: "post_id",
				select: ["title"],
				populate: [
					{
						path: "user_id",
						select: ["first_name", "last_name"],
					},
					{
						path: "tags_ids",
						select: ["name"],
					},
				],
			})

			// .populate({ path: "post_id",select: ["title"], populate: {path: "user_id"}, populate: {path: "tags_ids"}})

			.lean()
			.exec();
		return res.send(comments); //return is not mandatory
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		//findById is provided by mongoose which return the document which match the url id
		//since this return a promise we need to use lean and exec
		const comment = await Comment.findById(req.params.id)
			.populate("post_id")
			.lean()
			.exec();
		//if we need to find by first name
		//in get "/users/:name"
		// const user = await User.find({"first_name": req.params.name}).lean().exec();
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("", async (req, res) => {
	try {
		//express doesnt know how to read json data so use middleware app.use(express.json());
		const comment = await Comment.create(req.body);
		return res.status(201).json(comment);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		//findByIdAndUpdate provided by mongoose it will take 2 parameter (where to update, what to update)
		// new : true is for, to update the doc immediately and return that new doc in patch req and also in get req
		//but without new: true we will get updated doc in get req but not in patch req
		// const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);

		const comment = await Comment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		).populate("post_id");
		return res.status(201).json(comment);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.id)
			.populate("post_id")
			.lean()
			.exec();
		//delete all doc whose age is equal to 30
		// const user = await User.deleteMany({age: 30}).lean().exec();
		res.status(201).json(comment);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


module.exports = router;
