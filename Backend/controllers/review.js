const { review, user, movie } = require("../models");
const { ObjectId } = require("mongodb");

class Review {
	async getReviewByReviewId(req, res, next) {
		try {
			const data = await review
				.findById(req.params.id)
				.populate({ path: "user", select: ["username", "image"] })
				.populate({ path: "movie", select: ["title", "banner", "thumbnail"] });

			if (data == null) {
				return next({ status: 404, message: "No review found." });
			}
			res.status(200).json({ data });
		} catch (err) {
			next(err);
		}
	}

	async createReviewBySpecifyingMovieId(req, res, next) {
		try {
			// create Revie
			const user = req.user.user;
			const movie = req.params.id_movie;

			const createReview = await review.create({
				user,
				movie,
				headline: req.body.headline,
				content: req.body.content,
				rating: req.body.rating,
			});
			// Find Review Has beeen created
			const result = await review
				.findById(createReview._id)
				.populate({ path: "user", select: ["username", "image"] })
				.populate({ path: "movie", select: ["title", "banner", "thumbnail"] });

			// If success
			res.status(201).json({ result });
		} catch (error) {
			next(error);
		}
	}

	async getReviewByMovieId(req, res, next) {
		try {
			const data = await review
				.find({ movie: req.params.id_movie })
				.populate({ path: "user", select: ["username", "image"] })
				.populate({ path: "movie", select: ["title", "banner", "thumbnail"] });
			if (data == null) {
				return next({ status: 404, message: "No review found." });
			}
			res.status(200).json({
				data,
			});
		} catch (err) {
			next(err);
		}
	}

	async getReviewByUserId(req, res, next) {
		try {
			const data = await review
				.find({ user: req.params.id_user })
				.populate({ path: "user", select: ["username", "image"] })
				.populate({ path: "movie", select: ["title", "banner", "thumbnail"] });

			if (data == null) {
				return next({ status: 404, message: "No review found." });
			}
			res.status(200).json({
				data,
			});
		} catch (err) {
			next(err);
		}
	}

	async updateReview(req, res, next) {
		try {
			const getreview = await review.findById(req.params.id);
			if (getreview) {
				if (req.user.user != getreview.user) {
					return next({ status: 401, message: "User ID in token not matched" });
				}
			} else {
				return next({ status: 404, message: "Review not found" });
			}
			delete req.body.movie;
			delete req.body.user;
			const data = await review
				.findOneAndUpdate(
					{
						_id: req.params.id,
					},
					req.body,
					{
						new: true,
					}
				)
				.populate({ path: "user", select: ["username", "image"] })
				.populate({ path: "movie", select: ["title", "banner", "thumbnail"] });

			res.status(201).json({
				data,
			});
		} catch (err) {
			next(err);
		}
	}

	async deleteReview(req, res, next) {
		try {
			const getreview = await review.findById(req.params.id);
			if (getreview) {
				if (req.user.user != getreview.user) {
					return next({ status: 401, message: "User ID in token not matched" });
				}
			} else {
				return next({ status: 404, message: "Review not found" });
			}
			const data = await review.findByIdAndDelete(req.params.id);
			if (data.n == 0)
				return next({
					status: 400,
					message: `Review with id ${req.params.id} not found`,
				});
			res.status(200).json({
				message: `Review with id ${req.params.id} has been deleted`,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new Review();
