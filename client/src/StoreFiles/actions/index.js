import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const BUSCADO_POR_NOMBRE = "BUSCADO_POR_NOMBRE";
export const BUSCADO_POR_ID = "BUSCADO_POR_ID";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const ORDER_BY_CREATE = "ORDER_BY_CREATE";
export const ORDER_ALPHABE = "ORDER_ALPHABE";
export const ORDER_FUERZA = "ORDER_FUERZA";
export const DELETE_POKEMON_DETAIL = "DELETE_POKEMON_DETAIL";

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
        dispatch({ type: BUSCADO_POR_NOMBRE, payload: json.data })
      )
      .catch((e) => {
        console.log(e);
      });
  };
}

export function getPokemonById(id) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/api/pokemons/${id}`)
      .then((json) => dispatch({ type: BUSCADO_POR_ID, payload: json.data }))
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
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
}

export function FilterCreated(payload) {
  return {
    type: ORDER_BY_CREATE,
    payload,
  };
}

export function OrdenAlphabeth(payload) {
  return {
    type: ORDER_ALPHABE,
    payload,
  };
}

export function Ordenfuerza(payload) {
  return {
    type: ORDER_FUERZA,
    payload,
  };
}

export function DeleteDetail() {
  return { 
    type: DELETE_POKEMON_DETAIL, 
    payload: {} 
  }
}
