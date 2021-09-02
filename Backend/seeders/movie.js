const faker = require("faker");
const { movie, actor } = require("../models");

exports.addMovie = async () => {
  for (let i = 0; i < 50; i++) {
    let date = faker.date.past(20).toISOString().substr(0, 10).split("-");
    [date[1], date[2]] = [date[2], date[1]];
    date = date.join("-");

    const availableTags = [
      "action",
      "horror",
      "romance",
      "drama",
      "scifi",
      "thriller",
      "comedy",
      "crime",
      "documentary",
      "musical",
      "western",
      "war",
      "music",
      "animation",
      "adventure",
      "fantasy",
      "biography",
    ];
    const tags = [];
    for (let j = 0; j < 4; j++) {
      const tag =
        availableTags[Math.floor(Math.random() * availableTags.length)];
      if (!tags.includes(tag)) tags.push(tag);
    }
    const actors = [];
    const availableActors = await actor.find();
    for (let j = 0; j < 4; j++) {
      const actor =
        availableActors[Math.floor(Math.random() * availableActors.length)];
      if (!actors.includes(actor.id)) actors.push(actor.id);
    }

    await movie.create({
      title: faker.random.words(),
      synopsis: faker.lorem.paragraph(),
      director: faker.name.findName(),
      actors,
      releasedate: date,
      banner: faker.image.imageUrl(1920, 1080, "banner", true, true),
      thumbnail: faker.image.imageUrl(400, 600, "thumbnail", true, true),
      trailer: `https://youtube.com/embed/${faker.datatype
        .uuid()
        .substr(0, 8)}`,
      tags,
    });
  }
  console.log("Movie has been seeded");
};

exports.deleteMovie = async () => {
  await movie.remove();
  console.log("Movie has been deleted");
};
