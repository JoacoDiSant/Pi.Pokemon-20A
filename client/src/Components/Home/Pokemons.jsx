import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPokemons } from "../../StoreFiles/actions";
import Pokemon from "../Card/Pokemon";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import {
  Ordenfuerza,
  OrdenAlphabeth,
  FilterByTypes,
  getTypes,
  FilterCreated,
} from "../../StoreFiles/actions";
import style from "./Pokemons.module.css";

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
    setPokemonPerPage(12);
  };

  // ---------------- ORDENAMIENTOS Y FILTROS -----------

  const types = useSelector((state) => state.types);

  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch, order]);

  function handleFiltType(e) {
    e.preventDefault();
    dispatch(FilterByTypes(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(FilterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(OrdenAlphabeth(e.target.value));
    SetCurrentPage(1);
    setOrder(`order ${e.target.value}`);
  }

  function handleAttack(e) {
    e.preventDefault();
    dispatch(Ordenfuerza(e.target.value));
    SetCurrentPage(1);
    setOrder(`order ${e.target.value}`);
  }

  // ----------------------------------------

  if (currentPokemons) {
    const pokeComponent = () => (
      <div className="Home">
        <NavBar />

        {/* --------PAGINADO------- */}

        <Paginado
          PokemonPorPagina={PokemonPerPage}
          pokemon={pokemon.length}
          Paginado={paginado}
        />

        {/* --------FILTROS------- */}

        <div className={style.container}>
          <div>
            <select
              onChange={(e) => handleFilterCreated(e)}
              className={style.filter}
            >
              <option value="api" key="API">
                BY Pokedex
              </option>
              <option value="Database" key="Database">
                BY Database
              </option>
            </select>
          </div>
          <div>
            <select onChange={(e) => handleSort(e)} className={style.filter}>
              <option value="A-Z" key="A-Z">
                A to Z
              </option>
              <option value="Z-A" key="Z-A">
                Z to A
              </option>
            </select>
          </div>
          <div>
            <select onChange={(e) => handleAttack(e)} className={style.filter}>
              <option value="strong" key="Mayor">
                stronger to weaker
              </option>
              <option value="weack" key="Menor">
                weaker to stronger
              </option>
            </select>
          </div>
          <select onChange={(e) => handleFiltType(e)} className={style.filter}>
            <option value="All">Filter Type</option>
            {types.map((t, i) => {
              return (
                <option value={t.name} key={i}>
                  {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </option>
              );
            })}
          </select>
        </div>
        {/* ---------------------- */}

        {currentPokemons.map((p) => {
          return (
            <Pokemon
              key={Math.random()}
              id={p.id}
              name={p.name}
              image={p.image}
              types={p.types}
              createInDatabase={p.createInDatabase}
            />
          );
        })}
      </div>
    );
    return currentPokemons.length ? pokeComponent() : <Loading />;
  }
}

export default Pokemons;
