import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = "Bearer " + newToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = (blog) => {
  const requestHeaders = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, blog, requestHeaders);

  return request.then((response) => response.data);
};

const putBlog = (blogId, updatedBlog) => {
  const requestHeaders = {
    headers: { Authorization: token },
  };

  const newUrl = `${baseUrl}/${blogId}`;

  const request = axios.put(newUrl, updatedBlog, requestHeaders);
  return request.then((response) => {
    return response.data;
  });
};

const commentBlog = (blogId, comments) => {
  const requestHeaders = {
    headers: { Authorization: token },
  };

  const newUrl = `${baseUrl}/${blogId}/comments`;

  const request = axios.put(newUrl, { comments }, requestHeaders);
  return request.then((response) => {
    return response.data;
  });
};

const deleteBlog = (blogId) => {
  const requestHeaders = {
    headers: { Authorization: token },
  };

  const newUrl = `${baseUrl}/${blogId}`;

  const request = axios.delete(newUrl, requestHeaders);
  return request.then((response) => response.data);
};

export { getAll, setToken, postBlog, putBlog, deleteBlog, commentBlog };
