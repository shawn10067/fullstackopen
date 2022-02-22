import { useDispatch } from "react-redux";
import { newAnec } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

let timeoutId = 0;

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anec = (event) => {
    event.preventDefault();
    clearTimeout(timeoutId);
    dispatch(newAnec(event.target.noteContent.value));
    dispatch(setMessage(`Added: ${event.target.noteContent.value}`));
    timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 2000);
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
