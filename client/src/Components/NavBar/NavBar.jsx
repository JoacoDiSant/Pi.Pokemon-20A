import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllPokemons } from "../../StoreFiles/actions";
import SearchBar from "./SearchBar";

function NavBar() {
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(GetAllPokemons());
  }

  return (
    <div>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div>
        <Link to="/create" className="aa">
          <button className="create">CREATE POKEMON</button>
        </Link>
        <button onClick={handleSubmit} className="PokemonsBacks">
          REFRESH POKEMON
        </button>
      </div>
    </div>
  );
}

export default NavBar;
