import axios from "axios";

const getAllBook = () => {
  return axios
    .get("/api/persons")
    .then((response) => response.data);
};

const postBook = (phone) => {
  return axios
    .post("/api/persons", phone)
    .then((response) => response.data);
};

const deleteBook = (id) => {
  return axios
    .delete(`/api/persons/${id}`)
    .then(() => true)
    .catch(() => false);
};

const updateBook = (id, phone) => {
  return axios
    .put(`/api/persons/${id}`, phone)
    .then((response) => response.data);
};

export default { postBook, getAllBook, deleteBook, updateBook };
