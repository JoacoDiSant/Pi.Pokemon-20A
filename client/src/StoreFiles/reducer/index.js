const initialState = {
  pokemon: [],
  pokemons: [],
  types: [],
  AllType:[],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POKEMON_ENCONTRADO":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
        AllType: action.payload
      };

    case "FILTER_BY_TYPES":
      console.log(state.AllType)
      console.log(action.payload)
      const AllTypes = state.AllType
      const FilterByTypes = action.payload === "All" ? AllTypes : AllTypes.filter((t) => t.type === action.payload)
      return {
        ...state,
        types: FilterByTypes
      }

    default:
      return state;
  }
}
