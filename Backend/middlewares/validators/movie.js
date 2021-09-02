const validator = require("validator");
const moment = require("moment");
const MAX_LIMIT = 50;
const { promisify } = require("util");
const { actor, movie } = require("../../models");

class MovieValidator {
	formatOffsetAndLimit(req, res, next) {
		// * Assign default values
		req.query.offset = req.query.offset || "0";
		req.query.limit = req.query.limit || "10";

		// * Validate if supplied queries are integer
		if (!validator.isInt(req.query.offset))
			return next({ status: 400, message: "Offset must be an integer" });
		if (!validator.isInt(req.query.limit))
			return next({ status: 400, message: "Limit must be an integer" });

		// * Parse queries to integers
		req.query.offset = parseInt(req.query.offset);
		req.query.limit = parseInt(req.query.limit);

		// * Check if offset is non-negative & limit greater than 0
		if (req.query.offset < 0)
			return next({
				status: 400,
				message: "Offset must be a non-negative integer",
			});
		if (req.query.limit < 1)
			return next({
				status: 400,
				message: "Limit must be greater than 0",
			});

		// * Set limit to max limit if excedeed
		if (req.query.limit > MAX_LIMIT) req.query.limit = MAX_LIMIT;
		next();
	}

	async createMovieValidator(req, res, next) {
		try {
			if (!req.body.title || !req.body.synopsis) {
				return next({
					status: 400,
					message: "Field title and synopsis are required",
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	}

	async updateMovieValidator(req, res, next) {
		try {
			const data = await movie.findById(req.params.id);
			if (!data)
				return next({
					status: 400,
					message: `Movie with id ${req.params.id} not found`,
				});
			next();
		} catch (err) {
			next(err);
		}
	}

	async changeMovieValidator(req, res, next) {
		try {
			// * Director can only be alpha
			if (req.body.director) {
				if (!validator.isAlpha(req.body.director, "en-US", { ignore: " ." }))
					return next({
						status: 400,
						message: "Director field is not accepted",
					});
			}

			// * Check if actors are in database
			if (req.body.actors) {
				for (let i = 0; i < req.body.actors.length; i++) {
					const getActor = await actor.findById(req.body.actors[i]);
					if (getActor == null)
						return next({
							status: 400,
							message: `Actor with id ${req.body.actors[i]} not found`,
						});
				}
			}

			// * Check if releasedate follows the format YYYY-DD-MM
			if (req.body.releasedate) {
				if (!moment(req.body.releasedate, "YYYY-DD-MM").isValid())
					return next({
						status: 400,
						message: "Release date format is wrong (Expected : YYYY-DD-MM)",
					});
			}

			// * Check if trailer is a url
			if (req.body.trailer) {
				if (
					!validator.isURL(req.body.trailer, {
						protocols: ["http", "https"],
					})
				)
					next({
						status: 400,
						message: "Field trailer doesn't refer to a valid URL",
					});
			}

			// * Check if tags is a valid word
			if (req.body.tags) {
				for (let i = 0; i < req.body.tags.length; i++) {
					if (!validator.isAlpha(req.body.tags[i]))
						return next({
							status: 400,
							message: `Tag ${req.body.tags[i]} is not valid`,
						});
				}
			}

			// * Handler for banner
			if (req.files?.banner) {
				const file = req.files.banner;
				if (!file.mimetype.startsWith("image"))
					return next({ status: 400, message: "Banner must be an image file" });

				if (file.size > 5000000)
					return next({
						status: 400,
						message: "Banner file must be lower than 5MB",
					});
				file.name = `${new Date().getTime()}_${file.name}`;
				const move = promisify(file.mv);
				await move(`./public/images/banner/${file.name}`);
				req.body.banner = file.name;
			} else if (req.body.banner) {
				if (!validator.isURL(req.body.banner, { protocols: ["http", "https"] }))
					next({
						status: 400,
						message: "Field banner doesn't refer to a valid URL",
					});
			}

			// * Handler for thumbnail
			if (req.files?.thumbnail) {
				const file = req.files.thumbnail;
				if (!file.mimetype.startsWith("image"))
					return next({
						status: 400,
						message: "Thumbnail must be an image file",
					});

				if (file.size > 2000000)
					return next({
						status: 400,
						message: "Thumbnail file must be lower than 2MB",
					});
				file.name = `${new Date().getTime()}_${file.name.replaceAll(" ", "_")}`;
				const move = promisify(file.mv);
				await move(`./public/images/thumbnail/${file.name}`);
				req.body.thumbnail = file.name;
			} else if (req.body.thumbnail) {
				if (
					!validator.isURL(req.body.thumbnail, { protocols: ["http", "https"] })
				)
					next({
						status: 400,
						message: "Field thumbnail doesn't refer to a valid URL",
					});
			}
			next();
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new MovieValidator();
