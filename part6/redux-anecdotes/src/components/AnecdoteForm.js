import { useDispatch } from "react-redux";
import { newAnec } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anec = (event) => {
    event.preventDefault();
    dispatch(newAnec(event.target.noteContent.value));
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
