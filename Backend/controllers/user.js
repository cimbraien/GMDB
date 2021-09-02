// Import user models & bcrypt
const { user } = require("../models");
const bcrypt = require("bcrypt");

class User {
  // Logic for getting all users existed
  async readAllUsers(req, res, next) {
    try {
      let data = await user.find().select("-password");

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Logic for getting user by it's id
  async readUserById(req, res, next) {
    try {
      const data = await user
        .findOne({ _id: req.params.id })
        .select("-password");
      if (!data) {
        return next({
          message: `User by id ${req.params.id} is not found`,
          status: 404,
        });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Logic to update user's password
  async updatePassword(req, res, next) {
    try {
      const data = await user.findOne({
        _id: req.user.user,
      });

      const validate = await bcrypt.compare(
        req.body.oldPassword,
        data.password
      );

      if (!validate) {
        return next({ status: 404, message: "Wrong old password!" });
      }

      const update = await user.updateOne(
        {
          _id: req.user.user,
        },
        { password: req.body.newPassword }
      );
      return res
        .status(200)
        .json({ message: "Password has been successfully changed" });
    } catch (error) {
      next(error);
    }
  }

  // Logic for updatiing user's information
  async updateUser(req, res, next) {
    try {
      if (req.user.user !== req.params.id) {
        return next({ message: "Token not authorized" });
      }
      delete req.body.password;
      delete req.body._id;
      const data = await user
        .findOneAndUpdate(
          {
            _id: req.user.user,
          },
          req.body,
          {
            new: true,
          }
        )
        .select("-password");

      if (!data) {
        return next({
          message: `User by id ${req.params.id} is not found`,
          status: 404,
        });
      }

      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Logic for updating user role
  async updateUserRole(req, res, next) {
    try {
      const data = await user.findOne({
        _id: req.params.id,
      });

      if (req.body.role !== "admin" && req.body.role !== "user")
        return next({
          message: "Role can only be admin and user",
          status: 404,
        });

      if (!data) {
        return next({
          message: `User by id ${req.params.id} is not found`,
          status: 404,
        });
      }
      const update = await user.updateOne(
        {
          _id: req.params.id,
        },
        { role: req.body.role }
      );

      return res
        .status(200)
        .json({ message: "Role has been successfully changed" });
    } catch (error) {
      next(error);
    }
  }

  // Logic for deletting user
  async deleteUser(req, res, next) {
    try {
      if (req.user.user !== req.params.id) {
        return next({ message: "Token not authorized" });
      }
      const data = await user.deleteMany({ _id: req.params.id });

      if (!data) {
        return next({
          message: `User by id ${req.params.id} is not found`,
          status: 404,
        });
      }

      return res
        .status(200)
        .json({ message: `User by id ${req.params.id} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
}

// Exports User class
module.exports = new User();
