import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";
import css from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const onChangeInputHandler = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div>
      <label className={css.searchTitle}>Find contacts by name or number</label>
      <input
        className={css.inputSearch}
        type="text"
        id="filter"
        name="filter"
        placeholder="Search..."
        value={filter}
        onChange={onChangeInputHandler}
      />
    </div>
  );
}

export default SearchBox;
