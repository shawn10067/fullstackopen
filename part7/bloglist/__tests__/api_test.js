const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const helper = require("../utils/test_helper");

jest.setTimeout(20000);

const api = supertest(app);

beforeEach(async () => {
  await helper.deleteDB();
  await helper.createDB();
});

// testing 'get' api
test("GET API", async () => {
  let response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length);
});

// id check
test("GET API ID", async () => {
  let response = await api.get("/api/blogs");
  for (let blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

// testing 'post' api
test("POST API", async () => {
  let loginAccount = await api.post("/api/login").send({
    userName: "Singham",
    password: "IAmSoLonely123",
  });
  let jsonString = "Bearer " + JSON.parse(loginAccount.toJSON().text)["token"];

  let newBlog = {
    author: "CC Hemsworth",
    title: "Evacuation of Dunkirk",
    url: "dunkirk.com",
    likes: 0,
  };

  let posted = await api
    .post("/api/blogs")
    .set({ Authorization: jsonString })
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(posted.body.title).toEqual("Evacuation of Dunkirk");

  let response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length + 1);
});

// testing 'post' api with likes ommited
test("POST API WITHOUT LIKES", async () => {
  let newBlog = {
    author: "Poopy Bandz Hemsworth",
    title: "Making Money Off Streaming",
    url: "how2stream.com",
  };

  let loginAccount = await api.post("/api/login").send({
    userName: "Singham",
    password: "IAmSoLonely123",
  });
  let jsonString = "Bearer " + JSON.parse(loginAccount.toJSON().text)["token"];

  let apiRes = await api
    .post("/api/blogs")
    .set("Authorization", jsonString)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  let response = await api.get("/api/blogs");
  let result = response.body.find((val) => val.title === newBlog.title);

  expect(result.likes).toEqual(0);
});

// testing 'post' api with likes ommited
test("POST API WITHOUT URL AND TITLE", async () => {
  let newBlog = {
    author: "BJ Mcolum",
    likes: 5,
  };

  let loginAccount = await api.post("/api/login").send({
    userName: "Singham",
    password: "IAmSoLonely123",
  });
  let jsonString = "Bearer " + JSON.parse(loginAccount.toJSON().text)["token"];

  await api
    .post("/api/blogs")
    .set("Authorization", jsonString)
    .send(newBlog)
    .expect(400);
});

// testing 'delete' api
test("DELETE API", async () => {
  let newBlog = {
    author: "BJ Mcolum",
    title: "How to sell Dame",
    url: "portland.com",
    likes: 5,
  };

  let loginAccount = await api.post("/api/login").send({
    userName: "Singham",
    password: "IAmSoLonely123",
  });
  let jsonString = "Bearer " + JSON.parse(loginAccount.toJSON().text)["token"];

  let result = await api
    .post("/api/blogs")
    .set("Authorization", jsonString)
    .send(newBlog)
    .expect(201);
  let id = result.body.id;

  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", jsonString)
    .expect(204);
  let response = await api.get("/api/blogs");
  let blogs = response.body.map((val) => val.id);

  expect(blogs).not.toContain(id);
});

// testing the update api through 'put'
test("PUT (UPDATE) API", async () => {
  // updating first blog
  let response = await api.get("/api/blogs");
  let updatingBlog = response.body[4];
  let currentLikes = updatingBlog.likes;
  let id = updatingBlog.id;

  // updating the blog
  updatingBlog.likes += 1;

  let loginAccount = await api.post("/api/login").send({
    userName: "Singham",
    password: "IAmSoLonely123",
  });

  let jsonString = "Bearer " + JSON.parse(loginAccount.toJSON().text)["token"];

  await api
    .put(`/api/blogs/${id}`)
    .set("Authorization", jsonString)
    .send({ likes: updatingBlog.likes })
    .expect(204);

  // finding same blog
  let newResponse = await api.get("/api/blogs");
  let sameBlog = newResponse.body;
  sameBlog = sameBlog.find((val) => val.id == id);

  expect(sameBlog.likes).toEqual(currentLikes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
