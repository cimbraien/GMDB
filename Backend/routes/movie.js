// ! Node module imports
const express = require("express");

// ! Dependency file imports
const {
  getAllMovies,
  getPaginatedMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByTitle,
  getMoviesByTag,
  getMoviesByYear,
  getMoviesByDirector,
  getMoviesByActor,
} = require("../controllers/movie");
const { admin } = require("../middlewares/auth");
const {
  createMovieValidator,
  updateMovieValidator,
  changeMovieValidator,
  formatOffsetAndLimit,
} = require("../middlewares/validators/movie");
const router = express.Router();

// ! Handle requests with specified controllers
router.route("/all").get(admin, getAllMovies);
router
  .route("/")
  .get(formatOffsetAndLimit, getPaginatedMovies)
  .post(admin, createMovieValidator, changeMovieValidator, createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .put(admin, updateMovieValidator, changeMovieValidator, updateMovie)
  .delete(admin, deleteMovie);
router.route("/title/:title").get(formatOffsetAndLimit, getMoviesByTitle);
router.route("/tag/:tag").get(formatOffsetAndLimit, getMoviesByTag);
router.route("/year/:year").get(formatOffsetAndLimit, getMoviesByYear);
router
  .route("/director/:director")
  .get(formatOffsetAndLimit, getMoviesByDirector);
router.route("/actor/:actorid").get(formatOffsetAndLimit, getMoviesByActor);

module.exports = router;
