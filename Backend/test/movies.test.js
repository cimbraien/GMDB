const req = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { user, movie, actor } = require("../models");

let movies = [];
let admin;
let adminToken;
let userAcc;
let userToken;

beforeAll(async () => {
  movies = await movie.find();

  try {
    adminAcc = await user.create({
      username: "admin",
      fullname: "GMDB Administator",
      email: "admin@gmdb.gabatch13.my.id",
      password: "th1sI5$ecR3T",
      role: "admin",
    });
  } catch (err) {
    adminAcc = await user.findOne({
      username: "admin",
    });
  }
  try {
    userAcc = await user.create({
      username: "tester",
      fullname: "GMDB Tester",
      email: "tester@gmdb.gabatch13.my.id",
      password: "th1sI5$ecR3T",
      role: "user",
    });
  } catch (err) {
    userAcc = await user.findOne({
      username: "tester",
    });
  }

  adminToken = jwt.sign({ user: adminAcc._id }, process.env.JWT_SECRET);
  userToken = jwt.sign({ user: userAcc._id }, process.env.JWT_SECRET);
});

describe("[GET /movie/all] - Get all movies", () => {
  it("Auth token not supplied", async () => {
    const res = await req(app).get("/movie/all");
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const res = await req(app)
      .get("/movie/all")
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Success response", async () => {
    const res = await req(app)
      .get("/movie/all")
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/?offset=:num&limit=:num] - Get paginated movies", () => {
  it("Offset supplied is not an integer", async () => {
    const res = await req(app).get("/movie/?offset=notanint");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Offset must be an integer");
  });
  it("Limit supplied is not an integer", async () => {
    const res = await req(app).get("/movie?limit=notanint");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Limit must be an integer");
  });
  it("Offset is a negative number", async () => {
    const res = await req(app).get("/movie?offset=-1");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Offset must be a non-negative integer");
  });
  it("Limit is lesser or equal than 0", async () => {
    const res = await req(app).get("/movie?limit=0");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Limit must be greater than 0");
  });
  it("Success response", async () => {
    const res = await req(app).get("/movie?limit=20");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.data.length).toEqual(20);
  });
});

describe("[GET /movie/:id] - Get movie by id", () => {
  it("Movie id doesn't exist", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const del = await movie.deleteOne({ _id: movieid });
    movies = await movie.find();

    const res = await req(app).get("/movie/" + movieid);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app).get("/movie/" + movieid);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[POST /movie] - Create a new movie", () => {
  it("Auth token not supplied", async () => {
    const res = await req(app).post("/movie");
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Title is not supplied", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        synopsis: faker.lorem.paragraph(),
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Field title and synopsis are required");
  });
  it("Synopsis is not supplied", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Field title and synopsis are required");
  });
  it("Director contains unssuported characters", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        director: "Gr3at director",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Director field is not accepted");
  });
  it("Actor doesn't exist", async () => {
    const actors = await actor.find();
    const actorid = actors[0]._id;
    await actor.deleteOne({ _id: actorid });

    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        actors: [actorid],
      });
    expect(res.statusCode).toEqual(400);
  });
  it("Release date format is wrong", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        releasedate: "26January2019",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Release date format is wrong (Expected : YYYY-DD-MM)"
    );
  });
  it("Release date format is wrong", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        releasedate: "26January2019",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Release date format is wrong (Expected : YYYY-DD-MM)"
    );
  });
  it("Trailer is not a valid url", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        trailer: "thisisthetrailerforthemovie",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Field trailer doesn't refer to a valid URL"
    );
  });
  it("Tag contains unssuported characters", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        tags: ["Horr0r"],
      });
    expect(res.statusCode).toEqual(400);
  });
  it("Banner is not a valid image file", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .field("title", faker.random.words())
      .field("synopsis", faker.lorem.paragraph())
      .attach("banner", "app.js");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Banner must be an image file");
  });
  it("Thumbnail is not a valid image file", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .field("title", faker.random.words())
      .field("synopsis", faker.lorem.paragraph())
      .attach("thumbnail", "app.js");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Thumbnail must be an image file");
  });
  it("Banner is not a valid url", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        banner: "thisisthebannerforthemovie",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Field banner doesn't refer to a valid URL"
    );
  });
  it("Thumbnail is not a valid url", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
        thumbnail: "thisisthethumbnailforthemovie",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Field thumbnail doesn't refer to a valid URL"
    );
  });
  it("Success response", async () => {
    const res = await req(app)
      .post("/movie")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
        synopsis: faker.lorem.paragraph(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[PUT /movie:id] - Update movie", () => {
  it("Auth token not supplied", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app).put("/movie/" + movieid);
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app)
      .put("/movie/" + movieid)
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Movie doesn't exist", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const del = await movie.deleteOne({ _id: movieid });

    const res = await req(app)
      .put("/movie/" + movieid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(400);
  });
  it("Success response", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app)
      .put("/movie/" + movieid)
      .set("Authorization", "Bearer " + adminToken)
      .send({
        title: faker.random.words(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[DELETE /movie:id] - Delete movie", () => {
  it("Auth token not supplied", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app).delete("/movie/" + movieid);
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app)
      .delete("/movie/" + movieid)
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Movie doesn't exist", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const del = await movie.deleteOne({ _id: movieid });

    const res = await req(app)
      .delete("/movie/" + movieid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(400);
  });
  it("Success response", async () => {
    const movieid = movies[Math.floor(Math.random() * movies.length)]._id;
    const res = await req(app)
      .delete("/movie/" + movieid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/title/:title] - Get movie by title", () => {
  it("Movie title not found", async () => {
    movies = await movie.find();

    const res = await req(app).get("/movie/title/thismovietitlewontexist543");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const title = movies[Math.floor(Math.random() * movies.length)].title;
    const res = await req(app).get("/movie/title/" + title);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/tag/:tag] - Get movie by tag", () => {
  it("Movie not found", async () => {
    movies = await movie.find();

    const res = await req(app).get("/movie/tag/thistagwontbefound");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const tag = movies[Math.floor(Math.random() * movies.length)].tags[0];
    const res = await req(app).get("/movie/tag/" + tag);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/year/:year] - Get movie by year", () => {
  it("Movie not found", async () => {
    movies = await movie.find();

    const res = await req(app).get("/movie/tag/2030");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const year =
      movies[Math.floor(Math.random() * movies.length)].releasedate.split(
        "-"
      )[0];

    const res = await req(app).get("/movie/year/" + year);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/director/:director] - Get movie by director", () => {
  it("Movie title not found", async () => {
    movies = await movie.find();

    const res = await req(app).get(
      "/movie/director/thismoviedirectorwontexist543"
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const director = movies[Math.floor(Math.random() * movies.length)].director;
    const res = await req(app).get("/movie/director/" + director);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /movie/actor/:actorid] - Get movie by actor", () => {
  it("Movie title not found", async () => {
    movies = await movie.find();

    const res = await req(app).get("/movie/actor/610ae04c672980ab43a865c1");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("No movie found.");
  });
  it("Success response", async () => {
    const actor = movies[Math.floor(Math.random() * movies.length)].actors[0];
    const res = await req(app).get("/movie/actor/" + actor);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});
