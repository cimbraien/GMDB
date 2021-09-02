const validator = require("validator");
const mongoose = require("mongoose");
const { movie, user } = require("../../models");

exports.getDetailReviewValidator = async (req, res, next) => {
	try {
		/* if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return next({ message: "id is not valid", statusCode: 400 });
		} */

		next();
	} catch (error) {
		next(error);
	}
};

exports.createReviewValidator = async (req, res, next) => {
	try {
		 
		if (!req.body.rating) {
			return next({ status: 400, message: "Rating must not be empty" });
		}

		if (!req.body.headline) {
			return next({ status: 400, message: "Headline must not be empty" });
		}
		if (!req.body.content) {
			return next({ status: 400, message: "Content must not be empty" });
		}

		if (
			![
				"0",
				"0.5",
				"1",
				"1.5",
				"2",
				"2.5",
				"3",
				"3.5",
				"4",
				"4.5",
				"5",
			].includes("" + req.body.rating)
		) {
			return next({
				status: 400,
				message: "Rating must be between 0-5 (integers and half values)",
			});
		}
		if (!validator.isAlpha(req.body.headline, "en-US", { ignore: "!" })) {
			return next({ status: 400, message: "headline can only be one word" });
		}
		/* if (errorMessages.length > 0) {
			return next({ messages: errorMessages, statusCode: 400 });
		} */

		next();
	} catch (error) {
		next(error);
	}
};

exports.updateReviewValidator = async (req, res, next) => {
	try {
		/* Validate the user input */
		// const errorMessages = [];

		if (req.body.rating) {
			if (!validator.isInt("" + req.body.rating)) {
				return next({
					status: 400,
					message: "Rating must be a number (integer)",
				});
			}
		}
		if (req.body.headline) {
			if (!validator.isAlpha(req.body.headline)) {
				return next({ status: 400, message: "headline can only be one word" });
			}
		}
		/* if (errorMessages.length > 0) {
			return next({ messages: errorMessages, statusCode: 400 });
		} */

		next();
	} catch (error) {
		next(error);
	}
};
