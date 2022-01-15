import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const POKEMON_ENCONTRADO = "POKEMON_ENCONTRADO";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";

export function GetAllPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemons")
      .then((pokemon) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: pokemon.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function getPokemonByName(search) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/api/pokemons?name=${search}`)
      .then((json) =>
        dispatch({ type: POKEMON_ENCONTRADO, payload: json.data })
      )
      .catch((e) => {
        console.log(e);
      });
  };
}

export function createPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/api/pokemons/",
      payload
    );
    return response;
  };
}

export function getTypes() {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/api/types")
      .then((json) => {
        dispatch({
          type: GET_TYPES,
          payload: json.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function FilterByTypes(payload) {
  console.log(payload)
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}
