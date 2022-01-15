const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, Type, conn } = require("../../db");

const GetAllPokemonsApi = async () => {
  try {
    const Api = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const Api2 = await axios.get(Api.data.next);
    const resMap = Api.data.results.map((e) => axios.get(e.url));
    const resMap2 = Api2.data.results.map((e) => axios.get(e.url));
    const PokeConcat = resMap.concat(resMap2);
    const promise = await Promise.all(PokeConcat).then((e) => {
      let pokemon = e.map((e) => e.data);
      let arrPokem = [];
      pokemon.map((e) => {
        arrPokem.push({
          id: e.id,
          name: e.name,
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          image: e.sprites.other.dream_world.front_default,
          types:
            e.types.length < 2
              ? [e.types[0].type.name]
              : [e.types[0].type.name, e.types[1].type.name],
        });
      });
      return arrPokem;
    });
    return promise;
  } catch (e) {
    console.log(e);
  }
};

const GetAllPokemonsApiByName = async (name) => {
  if (typeof name === "string") {
    name = name.toLowerCase();
  }
  try {
    const foundPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    const detailPokemon = {
      id: foundPokemon.data.id,
      name: foundPokemon.data.name,
      hp: foundPokemon.data.stats[0].base_stat,
      attack: foundPokemon.data.stats[1].base_stat,
      defense: foundPokemon.data.stats[2].base_stat,
      speed: foundPokemon.data.stats[5].base_stat,
      height: foundPokemon.data.height,
      weight: foundPokemon.data.weight,
      image: foundPokemon.data.sprites.other.dream_world.front_default,
      types:
        foundPokemon.data.types.length < 2
          ? [foundPokemon.data.types[0].type.name]
          : [
              foundPokemon.data.types[0].type.name,
              foundPokemon.data.types[1].type.name,
            ],
    };
    return detailPokemon;
  } catch (err) {
    console.log(err);
  }
};

const GetAllPokemonsDB = async () => {
  try {
    const PokeDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["id", "name"],
      },
      attributes: [
        "dbId",
        "name",
        "hp",
        "attack",
        "defense",
        "speed",
        "height",
        "weight",
        "image",
        "createInDatabase",
      ],
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const GetAllPokemonsDBbyName = async (name) => {
  name = name.toLowerCase();
  try {
    const PokeDB = await Pokemon.findOne({
      where: {
        name: name,
      },
      attributes: [
        "dbId",
        "name",
        "hp",
        "attack",
        "defense",
        "speed",
        "height",
        "weight",
        "image",
        "createInDatabase",
      ],
      include: {
        model: Type,
        attributes: ["id", "name"],
      },
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const GetPokemonById = async (id) => {
  const ApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const value = ApiId.data;
  return {
    id: value.id,
    name: value.name,
    hp: value.stats[0].base_stat,
    attack: value.stats[1].base_stat,
    defense: value.stats[2].base_stat,
    speed: value.stats[5].base_stat,
    height: value.height,
    weight: value.weight,
    image: value.sprites.other.home.front_default,
    types: value.types.map((e) => e.type.name).join(", "),
  };
};

const GetPokemonDBbyId = async (id) => {
  try {
    const PokeDB = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["id", "name"],
      },
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const CreatePokemon = async (pokemon) => {
  let { id, name, hp, attack, defense, speed, height, weight, image, types } =
    pokemon;
  console.log(name, hp, attack, defense, speed, height, weight, image, types);
  try {
    const newPokemon = await Pokemon.create({
      id,
      name: name.toLowerCase(),
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });

    const typeDb = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typeDb);

    return newPokemon;
  } catch (err) {
    console.log(err);
  }
};

const GetTypes = async () => {
  try {
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const data = apiTypes.data.results;

    data.forEach((e) => {
      Type.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });

    const typesDb = await Type.findAll();

    return typesDb;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAllPokemonsApi,
  GetAllPokemonsDB,
  CreatePokemon,
  GetAllPokemonsDBbyName,
  GetAllPokemonsApiByName,
  GetPokemonById,
  GetPokemonDBbyId,
  GetTypes,
};
