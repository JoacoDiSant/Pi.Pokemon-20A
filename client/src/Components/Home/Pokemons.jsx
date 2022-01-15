import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPokemons } from "../../StoreFiles/actions";
import Pokemon from "../Card/Pokemon";
import Filters from "../Filters";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";

function Pokemons() {
  let dispatch = useDispatch();

  const pokemon = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(GetAllPokemons());
  }, [dispatch]);

  // -------- Paginado -------------

  const [CurrentPage, SetCurrentPage] = useState(1);
  const [PokemonPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = CurrentPage * PokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - PokemonPerPage;
  const currentPokemons = pokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const paginado = (numberpage) => {
    SetCurrentPage(numberpage);
    setPokemonPerPage(12)
  };

  // ----------------------------------------
  return (
    <div className="Home">
      <NavBar />
      <Paginado
      PokemonPorPagina={PokemonPerPage}
      pokemon={pokemon.length}
      Paginado={paginado} />
      <Filters />
      {currentPokemons.map((p) => {
        return (
          <Pokemon key={Math.random()} name={p.name} image={p.image} types={p.types} createInDatabase={p.createInDatabase} />
          );
        })}
    </div>
  );
}

export default Pokemons;
