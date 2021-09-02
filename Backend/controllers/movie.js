const { movie } = require("../models");

class Movie {
  async getAllMovies(req, res, next) {
    try {
      const data = await movie
        .find({})
        .populate({ path: "actors", select: ["name", "image"] });
      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPaginatedMovies(req, res, next) {
    try {
      const data = await movie
        .find({})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });
      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMovieById(req, res, next) {
    try {
      const data = await movie
        .findById(req.params.id)
        .populate({ path: "actors", select: ["name", "image"] });
      if (data == null) {
        return next({ status: 404, message: "No movie found." });
      }
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async createMovie(req, res, next) {
    try {
      const createdata = await movie.create(req.body);
      const data = await movie.findById(createdata._id);
      res.status(201).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateMovie(req, res, next) {
    try {
      const data = await movie
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .populate({ path: "actors", select: ["name", "image"] });
      res.status(201).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteMovie(req, res, next) {
    try {
      const data = await movie.deleteById({ _id: req.params.id });
      if (data.n == 0)
        return next({
          status: 400,
          message: `Movie with id ${req.params.id} not found`,
        });
      res.status(200).json({
        message: `Movie with id ${req.params.id} has been deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMoviesByTitle(req, res, next) {
    try {
      req.params.title = req.params.title.replaceAll("+", " ");
      const data = await movie
        .find({
          title: { $regex: req.params.title, $options: "i" },
        })
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });

      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  async getMoviesByTag(req, res, next) {
    try {
      const data = await movie
        .find({
          tags: req.params.tag,
        })
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });

      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  async getMoviesByYear(req, res, next) {
    try {
      const data = await movie
        .find({
          releasedate: { $regex: req.params.year },
        })
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });

      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  async getMoviesByDirector(req, res, next) {
    try {
      req.params.director = req.params.director.replaceAll("+", " ");
      const data = await movie
        .find({
          director: { $regex: req.params.director, $options: "i" },
        })
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });

      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  async getMoviesByActor(req, res, next) {
    try {
      const data = await movie
        .find({
          actors: req.params.actorid,
        })
        .skip(req.query.offset)
        .limit(req.query.limit)
        .populate({ path: "actors", select: ["name", "image"] });

      if (data.length == 0) {
        return next({ status: 404, message: "No movie found." });
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Movie();
