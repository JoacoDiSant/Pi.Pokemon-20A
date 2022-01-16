import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllPokemons } from "../../StoreFiles/actions";
import SearchBar from "./SearchBar";
import style from "./NavBar.module.css";
import Filters from "../Filters";

function NavBar() {
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(GetAllPokemons());
  }

  return (
    <div className={style.NavbarContainer}>
      <SearchBar />
      <Filters />
      <div className={style.btnContainer}>
        <Link to="/create" className={style.aa}>
          <button className={style.btn}>CREATE POKEMON</button>
        </Link>
        <button onClick={handleSubmit} className={style.PokemonsBacks}>
          REFRESH POKEMON
        </button>
      </div>
    </div>
  );
}

export default NavBar;
