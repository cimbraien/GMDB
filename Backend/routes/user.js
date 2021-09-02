// import express
const express = require("express");

// import validators
const {
  formatPhoto,
  signInValidator,
  signUpValidator,
  passwordValidator,
} = require("../middlewares/validators/user");

const {
  signin,
  signup,
  user,
  admin,
  adminOrUser,
} = require("../middlewares/auth/index");

// import controllers
const {
  readAllUsers,
  readUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  updatePassword,
} = require("../controllers/user");

const { getToken, getMe } = require("../controllers/auth");

// make routes
const router = express.Router();

router.get("/", admin, readAllUsers);
router.post("/signup", signUpValidator, signup, getToken);
router.get("/me", adminOrUser, getMe);
router.post("/signin", signInValidator, signin, getToken);
router.put("/role/:id", admin, updateUserRole);
router.put("/newpassword", adminOrUser, passwordValidator, updatePassword);
router.get("/:id", readUserById);
router.put("/:id", adminOrUser, formatPhoto, updateUser);
router.delete("/:id", adminOrUser, deleteUser);

// export routes
module.exports = router;
