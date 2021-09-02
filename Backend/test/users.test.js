const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { user } = require("../models");

let data = [];
let userToken = "";
let adminToken = "";
let pengguna = "";
let admin = "";

beforeAll(async () => {
  data = await user.find();

  try {
    pengguna = await user.create({
      fullname: "Gema Darmawan",
      username: "gematest",
      email: "gemtest69@mail.com",
      password: "Gema123!.",
      image: faker.image.avatar(),
      role: "user",
    });
  } catch {
    pengguna = await user.findOne({
      username: "gematest",
    });
  }

  try {
    admin = await user.create({
      fullname: "admin",
      username: "admin1test",
      email: "admin1test@mail.com",
      password: "Gema123!.",
      image: faker.image.avatar(),
      role: "admin",
    });
  } catch {
    admin = await user.findOne({
      username: "admin1test",
    });
  }

  userToken = jwt.sign({ user: pengguna._id }, process.env.JWT_SECRET);
  adminToken = jwt.sign({ user: admin._id }, process.env.JWT_SECRET);
});

describe("/user/signup POST", () => {
  it("Succeed", async () => {
    const response = await request(app).post("/user/signup").send({
      fullname: "gema darmawan",
      username: faker.lorem.word(),
      email: faker.internet.email(),
      password: "Gema123!.",
      image: faker.image.avatar(),
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong name format", async () => {
    const response = await request(app).post("/user/signup").send({
      fullname: "gema_darmawan",
      password: "Gema123!.",
      username: faker.lorem.word(),
      email: faker.internet.email(),
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Password is not strong enough", async () => {
    const response = await request(app).post("/user/signup").send({
      username: faker.lorem.word(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      fullname: "gema darmawan",
      password: "abcd",
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Username format is wrong", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "gema dar",
      fullname: "gema darmawan",
      email: faker.internet.email(),
      password: "Gema123!.",
      image: faker.image.avatar(),
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Field is empty", async () => {
    const response = await request(app)
      .post("/user/signup")
      .send({ fullname: "", username: "", email: "", password: "", image: "" });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user/signin POST", () => {
  it("Succeed", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "gemtest69@mail.com", password: "Gema123!." });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong Password", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "gemtest69@mail.com", password: "Gema123!!" });

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong email", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "gema23444@mail.com", password: "Gema123!." });

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong email format", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "gem@mailcom", password: "Gema123!." });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Field is empty", async () => {
    const response = await request(app)
      .post("/user/signup")
      .send({ email: "", password: "" });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user GET all", () => {
  it("Succed", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "Bearer " + adminToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Auth token not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).get("/user");
    expect(response.statusCode).toEqual(500);
  });

  it("Auth token not valid", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .get("/user/")
      .set("Authorization", "Bearer " + userToken);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user GET id", () => {
  it("Succed", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).get("/user/" + id);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User is not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const rm = await user.deleteOne({ _id: id });
    data = await user.find();
    const response = await request(app).get("/user/" + id);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user PUT user profile", () => {
  it("Succed", async () => {
    const response = await request(app)
      .put("/user/" + pengguna._id)
      .set("Authorization", "Bearer " + userToken);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Auth token not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).put("/user/" + id);
    expect(response.statusCode).toEqual(500);
  });

  it("Auth token not valid", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/" + id)
      .set("Authorization", "Bearer " + adminToken);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Image URl is invalid", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/" + id)
      .set("Authorization", "Bearer " + userToken)
      .send({ image: "this is not image" });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Image is not valid", async () => {
    const response = await request(app)
      .put("/user/" + pengguna._id)
      .set("Authorization", "Bearer " + userToken)
      .attach("image", "app.js");
    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user PUT user password", () => {
  it("Auth token not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).put("/user/newpassword");
    expect(response.statusCode).toEqual(500);
  });

  it("Auth token not valid", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/newpassword")
      .set("Authorization", "Bearer " + adminToken);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Succed", async () => {
    const response = await request(app)
      .put("/user/newpassword")
      .set("Authorization", "Bearer " + userToken)
      .send({ oldPassword: "Gema123!.", newPassword: "Gema123!." });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong old password", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/newpassword")
      .set("Authorization", "Bearer " + userToken)
      .send({ oldPassword: "Gema123!..", newPassword: "Gema123.!." });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user PUT user role", () => {
  it("Succed", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/role/" + id)
      .set("Authorization", "Bearer " + adminToken)
      .send({ role: "admin" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Wrong role", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .put("/user/role/" + id)
      .set("Authorization", "Bearer " + adminToken)
      .send({ role: "notrole" });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User is not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const rm = await user.deleteOne({ _id: id });
    data = await user.find();

    const response = await request(app)
      .put("/user/role/" + id)
      .set("Authorization", "Bearer " + adminToken);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user DELETE user", () => {
  it("Succed", async () => {
    const response = await request(app)
      .delete("/user/" + pengguna._id)
      .set("Authorization", `Bearer ${userToken}`);

    data = await user.find();
    expect(response.statusCode).toEqual(200);
  });

  it("Auth token not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).delete("/user/" + id);
    expect(response.statusCode).toEqual(500);
  });

  it("Auth token not valid", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .delete("/user/" + id)
      .set("Authorization", "Bearer " + adminToken);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("/user GET me", () => {
  it("Succed", async () => {
    const response = await request(app)
      .get("/user/me")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toEqual(200);
  });

  it("Token not authorized", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app)
      .get("/user/me")
      .set("Authorization", "Bearer" + " ");

    expect(response.statusCode).toEqual(500);
  });

  it("Auth token not found", async () => {
    const id = data[Math.floor(Math.random() * data.length)]._id;
    const response = await request(app).delete("/user/me");
    expect(response.statusCode).toEqual(500);
  });
});
