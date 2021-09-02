// ! Import dotenv for use in seeding
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});
const mongoose = require("mongoose");

// ! Initiate connection to database
try {
	const connection = mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log("Connection to mongodb established.");
} catch (error) {
	console.error(error);
}

exports.user = require("./user");
exports.movie = require("./movie");
exports.actor = require("./actor");
exports.review= require("./review");
