import React, { useState } from "react";
import { getPokemonByName } from "../../StoreFiles/actions";
import { useDispatch } from "react-redux";

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
    <div className="search-container">
      <input
        type="text"
        name="search"
        value={status.search}
        onChange={(e) => handleChange(e)}
        placeholder="Pokemon name.."
      />
      <button
        type="submit"
        className="button"
        onClick={(e) => handleSubmit(e)}
      >Search</button>
    </div>
  );
}
