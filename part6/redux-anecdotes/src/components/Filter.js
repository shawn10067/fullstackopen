import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const filterChange = (event) => {
    props.dispatchFilter(event.target.value);
  };
  return (
    <div>
      <input name="filterInput" type="text" onChange={filterChange} />
    </div>
  );
};

const mapDispatchToProps = {
  dispatchFilter: setFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
