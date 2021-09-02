const faker = require("faker");
const actor = require("../models/actor");

exports.addActor = async () => {
  for (let i = 0; i < 20; i++) {
    await actor.create({
      name: faker.name.findName(),
      image: faker.image.avatar(),
    });
  }
  console.log("Actor has been seeded");
};

exports.deleteActor = async () => {
  await actor.remove();
  console.log("Actor has been deleted");
};
