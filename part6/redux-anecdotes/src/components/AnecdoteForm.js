import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createMessage } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anec = async (event) => {
    event.preventDefault();
    props.dispatchAddAnec(event.target.noteContent.value);
    props.dispatchCreateMessage(`Added: ${event.target.noteContent.value}`, 5);
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

const mapDispatchToProps = {
  dispatchAddAnec: addAnecdote,
  dispatchCreateMessage: createMessage,
};

export default connect(null, mapDispatchToProps)(AnecdoteList);
