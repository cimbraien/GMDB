const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		synopsis: {
			type: String,
			required: true,
		},
		director: String,
		actors: [
			{
				type: mongoose.Types.ObjectId,
				ref: "actor",
			},
		],
		releasedate: String,
		banner: {
			type: String,
			get: getBanner,
		},
		thumbnail: {
			type: String,
			get: getThumbnail,
		},
		trailer: String,
		tags: [String],
		rating: {
			type: Number,
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

function getBanner(img) {
	if (!img || img.startsWith("http")) {
		return img;
	}
	return `/images/banner/${img}`;
}

function getThumbnail(img) {
	if (!img || img.startsWith("http")) {
		return img;
	}
	return `/images/thumbnail/${img}`;
}

movieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", movieSchema);
