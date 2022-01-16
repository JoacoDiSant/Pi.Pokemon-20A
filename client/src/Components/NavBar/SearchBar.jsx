import React, { useState } from "react";
import { getPokemonByName } from "../../StoreFiles/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ search: "" });
  function handleChange(e) {
    setStatus({ search: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonByName(status.search));
    setStatus({ search: "" });
  }
  return (
    <div className={style.searchContainer}>
      <button
        type="submit"
        className={style.button}
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
      <input
        className={style.input}
        type="text"
        name="search"
        value={status.search}
        onChange={(e) => handleChange(e)}
        placeholder="Pokemon name.."
      />
    </div>
  );
}
