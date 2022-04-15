const express = require("express");
const connect = require("./configs/db");

const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const tagController = require("./controllers/tag.controller");
const commentController = require("./controllers/comment.controller");



const app = express();

app.use(express.json());


app.use("/users", userController);
app.use("/posts", postController);
app.use("/tags", tagController);
app.use("/comments", commentController);


//------------------------------------------------------------------------------------------------------------------------
app.listen(8000, async () => {
	try {
		await connect();
		console.log(`App is Listening on Port 8000`);
	} catch (e) {
		console.log(e.message);
	}
});
