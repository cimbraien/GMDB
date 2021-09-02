// Import jwt and user model
const jwt = require("jsonwebtoken");
const { user } = require("../models");

class Auth {
  // Generate token
  getToken(req, res, next) {
    try {
      const data = {
        user: req.user._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
  // Show user information except password
  async getMe(req, res, next) {
    try {
      const data = await user
        .findOne({ _id: req.user.user })
        .select("-password");

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Auth();
