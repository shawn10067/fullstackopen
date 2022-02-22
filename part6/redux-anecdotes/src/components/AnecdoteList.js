import { vote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

let timeoutId = 0;

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecReducer);
  const dispatch = useDispatch();
  const voteNote = (id, content) => {
    clearTimeout(timeoutId);
    dispatch(setMessage(`Voted for: ${content}`));
    timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 2000);
    dispatch(vote(id));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteNote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
