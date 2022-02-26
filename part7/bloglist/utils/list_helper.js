const listHelper = (blogs) => {
  let total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return total;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  return blogs.reduce((biggest, blog) => {
    return biggest.likes < blog.likes ? blog : biggest;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let uniqueAuthors = [];

  for (let blog of blogs) {
    let uniqueAuthor = uniqueAuthors.find((val) => val.author == blog.author);
    if (uniqueAuthor) {
      uniqueAuthor.blogs += 1;
    } else {
      uniqueAuthors = uniqueAuthors.concat([
        {
          author: blog.author,
          blogs: 1,
        },
      ]);
    }
  }
  uniqueAuthors = uniqueAuthors.sort((a, b) => {
    if (a.blogs > b.blogs) {
      return 1;
    } else if (a.blogs < b.blogs) {
      return -1;
    }
    return 0;
  });
  return uniqueAuthors[uniqueAuthors.length - 1];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let uniqueAuthors = [];

  for (let blog of blogs) {
    let uniqueAuthor = uniqueAuthors.find((val) => val.author == blog.author);
    if (uniqueAuthor) {
      uniqueAuthor.likes += blog.likes;
    } else {
      uniqueAuthors = uniqueAuthors.concat([
        {
          author: blog.author,
          likes: blog.likes,
        },
      ]);
    }
  }
  uniqueAuthors = uniqueAuthors.sort((a, b) => {
    if (a.likes > b.likes) {
      return 1;
    } else if (a.likes < b.likes) {
      return -1;
    }
    return 0;
  });
  return uniqueAuthors[uniqueAuthors.length - 1];
};

const dummy = () => 1;

module.exports = {
  listHelper,
  dummy,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
