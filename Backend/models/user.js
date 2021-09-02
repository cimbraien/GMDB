// Importing mongoose, mongoose-delete, and bycrpt
const mongoose = require("mongoose");
const softDelete = require("mongoose-delete");
const bcrypt = require("bcrypt");

// Defining user properties
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      requireed: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: setPassword,
    },
    image: {
      type: String,
      required: false,
      get: getPhoto,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
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

// getter for user profile picture
function getPhoto(profilePicture) {
  if (
    !profilePicture ||
    profilePicture.includes("https") ||
    profilePicture.includes("http")
  ) {
    return profilePicture;
  }

  return `/images/users/${profilePicture}`;
}

// password encryption
function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// activating mongoose-delete
userSchema.plugin(softDelete, { overrideMethods: "all" });

// exporting user model
module.exports = mongoose.model("user", userSchema);
