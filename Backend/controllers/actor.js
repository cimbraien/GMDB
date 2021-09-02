const { actor } = require("../models");

class Actor {
  async getAllActors(req, res, next) {
    try {
      const data = await actor.find({});
      if (data.length == 0) {
        return next({ status: 404, message: "No actors found." });
      }
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getActorById(req, res, next) {
    try {
      const data = await actor.findById(req.params.id);
      if (data == null) {
        return next({ status: 404, message: "No actor found." });
      }
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getActorByName(req, res, next) {
    try {
      req.params.name = req.params.name.replaceAll("+", " ");
      const data = await actor.find({
        name: { $regex: req.params.name, $options: "i" },
      });

      if (data.length == 0) {
        return next({ status: 404, message: "No actors found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  async createActor(req, res, next) {
    try {
      const data = await actor.create(req.body);
      res.status(201).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateActor(req, res, next) {
    try {
      const data = await actor.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteActor(req, res, next) {
    try {
      const data = await actor.deleteById({ _id: req.params.id });
      if (data.n == 0)
        return next({
          status: 400,
          message: `Actor with id ${req.params.id} not found`,
        });
      res.status(200).json({
        message: `Actor with id ${req.params.id} has been deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Actor();
