const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const actorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			get: getImage,
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

function getImage(img) {
	if (!img || img.startsWith("http")) {
		return img;
	}
	return `/images/actor/${img}`;
}

actorSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("actor", actorSchema);
