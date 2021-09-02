const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../controllers/review.js");
const reviewValidator = require("../middlewares/validators/review.js");

const { user, adminOrUser } = require("../middlewares/auth");


router.get(
	"/movie/:id_movie",
	reviewValidator.getDetailReviewValidator,
	Review.getReviewByMovieId
);
router.get(
	"/user/:id_user",
	reviewValidator.getDetailReviewValidator,
	Review.getReviewByUserId
);
router.post(
	"/:id_movie",
	user,
	reviewValidator.createReviewValidator,
	Review.createReviewBySpecifyingMovieId
);
router.put(
	"/:id",
	user,
	reviewValidator.updateReviewValidator,
	Review.updateReview
);
router.get(
	"/:id",
	reviewValidator.getDetailReviewValidator,
	Review.getReviewByReviewId
);
router.delete("/:id", user, Review.deleteReview);

module.exports = router;
