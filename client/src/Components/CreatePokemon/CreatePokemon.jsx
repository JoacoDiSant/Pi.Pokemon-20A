import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, createPokemon } from "../../StoreFiles/actions";
import style from "./Create.module.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Hey! Dont Forget My Name";
  }
  if (!input.hp) {
    errors.hp = "Hey! Dont Forget My Hp";
  }
  if (!input.attack) {
    errors.attack = "Hey! Dont Forget My Attack";
  }

  if (!input.types.length) {
    errors.types = "Hey! Dont Forget My Type";
  }

  return errors;
}

function PokemonCreate() {
  const dispatch = useDispatch();

  const SelectType = useSelector((state) => state.types);

  const [Create, setCreate] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setCreate({
      ...Create,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setCreate({
      ...Create,
      types: [...Create.types, e.target.value],
    });
  }

  function handelSubmitPost(e) {
    e.preventDefault();
    const error = validate(Create);

    if (!Object.keys(error).length) {
      dispatch(createPokemon(Create));
      alert("Pokemon Was Successfully Create!!");
      setCreate({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
        image:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
      });
    } else {
      alert("The Name, Hp , Attack and Type are obligatory!!");
    }
  }

  function handleDelete(el) {
    setCreate({
      ...Create,
      types: Create.types.filter((type) => type !== el),
    });
  }

  return (
    <div className={style.createForm}>
      <div>
        <h1>CREATE YOUR OWN POKEMON</h1>
      </div>
      <div>
        <form onSubmit={(e) => handelSubmitPost(e)} className={style.form}>
          <div>
            <div>
              <label>Name</label>
              <input
                type="text"
                className={style.input}
                value={Create.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Hp </label>
              <input
                type="number"
                className={style.input}
                value={Create.hp}
                name="hp"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Attack</label>
              <input
                type="number"
                className={style.input}
                value={Create.attack}
                name="attack"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Defense</label>
              <input
                type="number"
                className={style.input}
                value={Create.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Speed</label>
              <input
                type="number"
                className={style.input}
                value={Create.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Height</label>
              <input
                type="number"
                className={style.input}
                value={Create.height}
                name="height"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Weight</label>
              <input
                type="number"
                className={style.input}
                value={Create.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.SelectTypes}>
            <label>Choose the Type</label>
            <select
              name="type"
              onChange={(e) => handleSelect(e)}
              className={style.Selecttype}
            >
              {SelectType.map((t, i) => {
                return (
                  <option value={t.name} key={i}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            {Create.types.map((e, i) => {
              return (
                <div key={i} className={style.type}>
                  <button
                    type="button"
                    className={style.eliminate}
                    onClick={() => handleDelete(e)}
                  >
                    X
                  </button>
                  <p>{e}</p>
                </div>
              );
            })}
          </div>
        </form>
          <button type="submit" className={style.create}>
            Create
          </button>
        <Link to="/home">
          <button className={style.BtnBack}>Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default PokemonCreate;
