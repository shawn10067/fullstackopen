import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anec = async (event) => {
    event.preventDefault();
    dispatch(addAnecdote(event.target.noteContent.value));
    dispatch(createMessage(`Added: ${event.target.noteContent.value}`, 5));
    event.target.noteContent.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={anec}>
        <div>
          <input name="noteContent" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteList;
