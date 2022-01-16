const initialState = {
  pokemons: [],
  AllPokemons: [],
  types: [],
  AllType: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        AllPokemons: action.payload,
      };

    case "BUSCADO_POR_NOMBRE":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
        AllType: action.payload,
      };

    case "BUSCADO_POR_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "FILTER_BY_TYPES":
      let typefilt =
        action.payload === "All"
          ? state.AllPokemons
          : state.AllPokemons.filter((poke) => {
              return poke.types.some(
                (t) => t === action.payload || t.name === action.payload
              );
            });
      return {
        ...state,
        pokemons: typefilt,
      };

    case "ORDER_BY_CREATE":
      let create =
        action.payload === "Database"
          ? state.AllPokemons.filter((e) => e.createInDatabase)
          : state.AllPokemons.filter((e) => !e.createInDatabase);
      return {
        ...state,
        pokemons: action.payload === "api" ? state.AllPokemons : create,
      };

    case "ORDER_ALPHABE":
      let sortedArr =
        action.payload === "A-Z"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };

    case "ORDER_FUERZA":
      let sortedAttack =
        action.payload === "strong"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedAttack,
      };

    default:
      return state;
  }
}
