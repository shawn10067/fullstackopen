import { voteAnnecdote } from "../reducers/anecdoteReducer";
import { createMessage } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

let timeoutId = 0;

const AnecdoteList = () => {
  // getting and filtering anecdotes
  let anecdotes = useSelector((state) => state.anecReducer);
  const filter = useSelector((state) => state.filterReducer);

  anecdotes = anecdotes.filter((val) => val.content.includes(filter));

  // function to vote for them
  const dispatch = useDispatch();
  const voteNote = (id, content, likes) => {
    dispatch(createMessage(`Voted for: ${content}`, 2));
    dispatch(voteAnnecdote(id, content, likes));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                voteNote(anecdote.id, anecdote.content, anecdote.votes)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
