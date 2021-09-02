const faker = require("faker");
const { review, user, movie } = require("../models");

// Seeder add
exports.addReview = async () => {
  const availableUsers = await user.find();

  const availableMovies = await movie.find();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      try {
        await review.create({
          user: availableUsers[i]._id,
          movie:
            availableMovies[Math.floor(Math.random() * availableMovies.length)]
              ._id,
          content: faker.lorem.paragraph(),
          headline: faker.random.word(),
          image: faker.image.avatar(),
          rating: faker.random.arrayElement([
            "0",
            "0.5",
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
          ]),
        });
      } catch (err) {}
    }
  }
  console.log("Review have been added");
};

// Seeder delete
exports.deleteReview = async () => {
  await review.remove();
  console.log("Review have been deleted");
};
