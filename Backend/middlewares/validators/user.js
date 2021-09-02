const validator = require("validator");
const { promisify } = require("util");

// validator for sign up
exports.signUpValidator = async (req, res, next) => {
  try {
    if (
      !req.body.username ||
      !req.body.fullname ||
      !req.body.password ||
      !req.body.email
    ) {
      return next({ status: 404, message: "Field can't be empty" });
    }

    if (
      !validator.isAlphanumeric(req.body.username, "en-US", { ignore: "._" })
    ) {
      return next({
        status: 400,
        message: "User name can only contain (alphanumeric, ., _)",
      });
    }

    if (!validator.isStrongPassword(req.body.password)) {
      return next({
        status: 404,
        message: "Password is not strong enough",
      });
    }

    if (!validator.isAlpha(req.body.fullname, "en-US", { ignore: " " })) {
      return next({
        status: 400,
        message: "Full name can only contains letters",
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return next({ status: 400, message: "Email is not valid" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validator for password
exports.passwordValidator = async (req, res, next) => {
  try {
    if (!validator.isStrongPassword(req.body.newPassword)) {
      return next({
        status: 400,
        message: "Password is not strong enough",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validator for sign in
exports.signInValidator = async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.email) {
      return next({ status: 404, message: "Field can't be empty" });
    }

    if (!validator.isEmail(req.body.email)) {
      return next({ status: 400, message: "Email is not valid" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// validator for photo format
exports.formatPhoto = async (req, res, next) => {
  try {
    if (req.files?.image) {
      const file = req.files.image;
      if (!file.mimetype.startsWith("image"))
        return next({
          status: 400,
          message: "Profile Photo must be an image file",
        });

      if (file.size > 2000000)
        return next({
          status: 400,
          message: "Profile Photo file must be lower than 2MB",
        });
      file.name = `${new Date().getTime()}_${file.name}`;
      const move = promisify(file.mv);
      await move(`./public/images/users/${file.name}`);
      req.body.image = file.name;
    } else if (req.body.image) {
      if (!validator.isURL(req.body.image, { protocols: ["http", "https"] }))
        next({
          status: 400,
          message: "Profile Photo doesn't refer to a valid URL",
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};
