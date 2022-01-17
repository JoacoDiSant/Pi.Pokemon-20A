import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, createPokemon } from "../../StoreFiles/actions";
import style from "./Create.module.css";

function PokemonCreate() {
  const dispatch = useDispatch();

  const SelectType = useSelector((state) => state.types);

  // --------- CONTROL DEL FORMULARIO ----------

  function validate(input) {
    let errors = {};

    if (!validateName.test(input.name)) {
      errors.name = "Name is require and MUST be letters";
    }
    if (!validateNum.test(input.hp) || input.hp < 1 || input.hp > 300) {
      errors.hp = "HP is require and MUST be a number between 0 and 300";
    }
    if (
      !validateNum.test(input.attack) ||
      input.attack < 10 ||
      input.attack > 500
    ) {
      errors.attack =
        "Attack is require and MUST be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.defense) ||
      input.defense < 1 ||
      input.defense > 100
    ) {
      errors.defense =
        "Defense is require and MUST be a number between 0 and 100";
    }
    if (
      !validateNum.test(input.speed) ||
      input.speed < 10 ||
      input.speed > 500
    ) {
      errors.speed = "Speed is require and MUST be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.height) ||
      input.height < 30 ||
      input.height > 100
    ) {
      errors.height =
        "Height is require and MUST be a number between 30 and 100";
    }
    if (
      !validateNum.test(input.weight) ||
      input.weight < 10 ||
      input.weight > 500
    ) {
      errors.weight =
        "Weight is require and MUST be a number between 10 and 500";
    }
    if (!input.types.length) {
      errors.types = "Hey! Dont Forget My Type";
    }

    return errors;
  }

  const [stats, setstats] = useState({
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const [error, setError] = useState("");

  let validateName = /^[a-z]+$/i;
  let validateNum = /^([0-9])*$/;

  // --------- CREACION FORMULARIO ----------

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
    setError(
      validate({
        ...Create,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setCreate({
      ...Create,
      types: [...Create.types, e.target.value],
    });
  }

  function handelSubmitPost(e) {
    e.preventDefault();
    if (
      !error.name &&
      !error.img &&
      !error.hp &&
      !error.attack &&
      !error.defense &&
      !error.speed &&
      !error.heightt &&
      !error.weight &&
      !error.types
    ) {
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
      console.log(error);
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
                className={style.input}
                type="text"
                placeholder="Name..."
                name="name"
                value={Create.name}
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorN}>{error.name}</p>}
            </div>
            <div>
              <label>Hp </label>
              <input
                type="number"
                className={style.input}
                value={Create.hp}
                placeholder="HP..."
                name="hp"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorH}>{error.hp}</p>}
            </div>
            <div>
              <label>Attack</label>
              <input
                type="number"
                className={style.input}
                value={Create.attack}
                placeholder="Attack..."
                name="attack"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorA}>{error.attack}</p>}
            </div>
            <div>
              <label>Defense</label>
              <input
                type="number"
                className={style.input}
                value={Create.defense}
                placeholder="Defense..."
                name="defense"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorD}>{error.defense}</p>}
            </div>
            <div>
              <label>Speed</label>
              <input
                type="number"
                className={style.input}
                value={Create.speed}
                placeholder="Speed..."
                name="speed"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorS}>{error.speed}</p>}
            </div>
            <div>
              <label>Height</label>
              <input
                type="number"
                className={style.input}
                value={Create.height}
                placeholder="Height..."
                name="height"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorHE}>{error.height}</p>}
            </div>
            <div>
              <label>Weight</label>
              <input
                type="number"
                className={style.input}
                value={Create.weight}
                placeholder="Weight..."
                name="weight"
                onChange={(e) => handleChange(e)}
              />
              {!error ? null : <p className={style.errorW}>{error.weight}</p>}
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
                    {!error ? null : <p className={style.errorT}>{error.types}</p>}
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
          <button type="submit" className={style.create}>
            Create
          </button>
        </form>
        <Link to="/home">
          <button className={style.BtnBack}>Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default PokemonCreate;
