const faker = require("faker");
const { user } = require("../models");

exports.addUser = async () => {
  for (let i = 0; i < 50; i++) {
    await user.create({
      fullname: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "Gema123!.",
      image: faker.image.avatar(),
      role: "user",
    });
  }

  console.log("User has been seeded");
};

exports.deleteUser = async () => {
  await user.remove();

  console.log("User has been deleted");
};
