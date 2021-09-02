const { addActor, deleteActor } = require("./actor");
const { addMovie, deleteMovie } = require("./movie");
const { addUser, deleteUser } = require("./user");
const{addReview,deleteReview}=require("./review")

async function add() {
  await Promise.all([addUser(), addActor()]);
  await addMovie();
  await addReview()
}

async function remove() {
  await Promise.all([deleteUser(), deleteActor()]);
  await deleteMovie();
  await deleteReview()
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Database has been seeded");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Database has been cleaned");
    process.exit(0);
  });
}
