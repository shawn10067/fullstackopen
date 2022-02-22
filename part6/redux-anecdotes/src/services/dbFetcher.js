import axios from "axios";
const getId = () => (100000 * Math.random()).toFixed(0);

export const getAnec = async () => {
  let notes = await axios.get("http://localhost:3002/anecdotes");
  return notes.data;
};

export const addAnec = async (content) => {
  let note = {
    content,
    id: getId(),
    votes: 0,
  };
  let notes = await axios.post("http://localhost:3002/anecdotes", note);
  return notes.data;
};

export const likeAnec = async (id, content, likes) => {
  let anecdote = {
    content,
    id,
    votes: likes + 1,
  };

  let anec = await axios.put(`http://localhost:3002/anecdotes/${id}`, anecdote);
  return anec.data;
};
