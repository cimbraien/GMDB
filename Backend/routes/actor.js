// ! Node module imports
const express = require("express");
const {
  getAllActors,
  getActorById,
  updateActor,
  deleteActor,
  createActor,
  getActorByName,
} = require("../controllers/actor");
const { admin } = require("../middlewares/auth");
const {
  createActorValidator,
  changeActorValidator,
  updateActorValidator,
} = require("../middlewares/validators/actor");

// ! Dependency file imports

const router = express.Router();

// ! Handle requests with specified controllers
router
  .route("/")
  .get(getAllActors)
  .post(admin, createActorValidator, changeActorValidator, createActor);
router
  .route("/:id")
  .get(getActorById)
  .put(admin, updateActorValidator, changeActorValidator, updateActor)
  .delete(admin, deleteActor);
router.route("/name/:name").get(getActorByName);

module.exports = router;
