const listHelper = require("../utils/list_helper").listHelper;
const dummy = require("../utils/list_helper").dummy;
const favouriteBlog = require("../utils/list_helper").favouriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;
const mostLikes = require("../utils/list_helper").mostLikes;

const blogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },

  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
];

test("returns one", () => {
  expect(dummy([])).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper([])).toBe(0);
  });

  test("of one blog is that number of likes", () => {
    expect(
      listHelper([
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ])
    ).toBe(2);
  });

  test("of a big list is calculated right", () => {
    expect(listHelper(blogs)).toBe(36);
  });
});

describe("favourite blog", () => {
  test("of empty blog is empty object", () => {
    expect(favouriteBlog([])).toEqual({});
  });

  test("of one blog is that number of likes", () => {
    expect(
      favouriteBlog([
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ])
    ).toEqual({
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    });
  });

  test("of a big list is calculated right", () => {
    expect(favouriteBlog(blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("of empty blog is empty object", () => {
    expect(mostBlogs([])).toEqual({});
  });

  test("of one blog is that number of likes", () => {
    expect(
      mostBlogs([
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ])
    ).toEqual({
      author: "Robert C. Martin",
      blogs: 1,
    });
  });

  test("of a big list is calculated right", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty blog is empty object", () => {
    expect(mostLikes([])).toEqual({});
  });

  test("of one blog is that number of likes", () => {
    expect(
      mostLikes([
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ])
    ).toEqual({
      author: "Robert C. Martin",
      likes: 2,
    });
  });

  test("of a big list is calculated right", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
