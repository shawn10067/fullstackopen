import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const filterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <div>
      <input name="filterInput" type="text" onChange={filterChange} />
    </div>
  );
};

export default Filter;
