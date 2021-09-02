const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			default: null,
			min: 0,
			max: 5,
		},
		movie: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "movie",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
		headline: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
		toJSON: {
			getters: true,
			versionKey: false,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.deleted;
			},
		},
	}
);

// Prevent user for submitting more than one review per movie
ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

// Static method to get averaga rating
ReviewSchema.statics.getAverageRating = async function (id_movie) {
	const obj = await this.aggregate([
		{
			$match: { movie: id_movie },
		},
		{
			$group: {
				_id: "$id_movie",
				rating: { $avg: "$rating" },
			},
		},
	]);

	try {
		await this.model("movie").findByIdAndUpdate(id_movie, {
			rating: obj[0].rating.toFixed(2),
		});
	} catch (e) {
		console.error(e);
	}
};

// call getAverageCost after save
ReviewSchema.post("save", function () {
	this.constructor.getAverageRating(this.movie);
});

// call getAverageCost after remove
ReviewSchema.post("remove", function () {
	this.constructor.getAverageRating(this.movie);
});

// call getAverageCost after update
ReviewSchema.post("findOneAndUpdate", function (doc) {
	doc.constructor.getAverageRating(doc.movie._id);
});

// call getAverageCost after update
ReviewSchema.post("findOneAndDelete", function (doc) {
	doc.constructor.getAverageRating(doc.movie._id);
});

module.exports = mongoose.model("review", ReviewSchema);
