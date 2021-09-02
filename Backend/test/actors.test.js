const req = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { user, actor } = require("../models");

let actors = [];
let adminAcc;
let adminToken;
let userAcc;
let userToken;

beforeAll(async () => {
  actors = await actor.find();

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

describe("[GET /actor] - Get all actors", () => {
  it("Success response", async () => {
    const res = await req(app).get("/actor");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /actor/name/:name] - Get actor by name", () => {
  it("Success response", async () => {
    const name = actors[Math.floor(Math.random() * actors.length)].name;
    const res = await req(app).get("/actor/name/" + name);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[GET /actor/:id] - Get actor by id", () => {
  it("Success response", async () => {
    const id = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app).get("/actor/" + id);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[POST /actor] - Create actor", () => {
  it("Auth token not supplied", async () => {
    const res = await req(app).post("/actor");
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Name is not supplied", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Field name is required");
  });
  it("Name contains unsupported characters", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        name: "L33t Hacker",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Name field is not accepted");
  });
  it("Image is not a valid url", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        name: "Leet Hacker",
        image: "Supercool guy in mask",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Field image doesn't refer to a valid URL"
    );
  });
  it("Image is not a valid image file", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + adminToken)
      .field("name", "Leet Hacker")
      .attach("image", "app.js");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Image input must be an image file");
  });
  it("Success response", async () => {
    const res = await req(app)
      .post("/actor")
      .set("Authorization", "Bearer " + adminToken)
      .send({
        name: faker.name.findName(),
        image: faker.image.avatar(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[PUT /actor/:id] - Update actor", () => {
  it("Auth token not supplied", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app).put("/actor/" + actorid);
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .put("/actor/" + actorid)
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Actor id doesn't exist", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const del = await actor.deleteOne({ _id: actorid });
    actors = await actor.find();

    const res = await req(app)
      .put("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(400);
  });
  it("Name contains unsupported characters", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .put("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken)
      .send({
        name: "L33t Hacker",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Name field is not accepted");
  });
  it("Image is not a valid url", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .put("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken)
      .send({
        image: "Supercool guy in mask",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Field image doesn't refer to a valid URL"
    );
  });
  it("Success response", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .put("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken)
      .send({
        name: faker.name.findName(),
        image: faker.image.avatar(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("[DELETE /actor/:id] - Delete actor", () => {
  it("Auth token not supplied", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app).delete("/actor/" + actorid);
    expect(res.statusCode).toEqual(500);
  });
  it("Auth token not valid", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .delete("/actor/" + actorid)
      .set("Authorization", "Bearer " + userToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Forbidden access");
  });
  it("Actor id doesn't exist", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const del = await actor.deleteOne({ _id: actorid });
    actors = await actor.find();

    const res = await req(app)
      .delete("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(400);
  });
  it("Success response", async () => {
    const actorid = actors[Math.floor(Math.random() * actors.length)]._id;
    const res = await req(app)
      .delete("/actor/" + actorid)
      .set("Authorization", "Bearer " + adminToken);
    expect(res.statusCode).toEqual(200);
  });
});
