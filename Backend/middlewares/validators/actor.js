const validator = require("validator");
const { actor } = require("../../models");
const { promisify } = require("util");

class ActorValidator {
	async createActorValidator(req, res, next) {
		try {
			if (!req.body.name) {
				return next({
					status: 400,
					message: "Field name is required",
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	}

	async updateActorValidator(req, res, next) {
		try {
			const data = await actor.findById(req.params.id);
			if (!data)
				return next({
					status: 400,
					message: `Actor with id ${req.params.id} not found`,
				});
			next();
		} catch (err) {
			next(err);
		}
	}
	async changeActorValidator(req, res, next) {
		if (req.body.name) {
			if (!validator.isAlpha(req.body.name, "en-US", { ignore: " ." }))
				return next({
					status: 400,
					message: "Name field is not accepted",
				});
		}

		if (req.files?.image) {
			const file = req.files.image;
			if (!file.mimetype.startsWith("image"))
				return next({
					status: 400,
					message: "Image input must be an image file",
				});

			if (file.size > 2000000)
				return next({
					status: 400,
					message: "Image file must be lower than 2MB",
				});
			file.name = `${new Date().getTime()}_${file.name}`;
			const move = promisify(file.mv);
			await move(`./public/images/actor/${file.name}`);
			req.body.image = file.name;
		} else if (req.body.image) {
			if (!validator.isURL(req.body.image, { protocols: ["http", "https"] }))
				next({
					status: 400,
					message: "Field image doesn't refer to a valid URL",
				});
		}
		next();
	}
}

module.exports = new ActorValidator();
