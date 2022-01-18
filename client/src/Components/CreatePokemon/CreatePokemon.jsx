import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../../StoreFiles/actions";
import style from "./Create.module.css";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const selectType = useSelector((state) => state.types);
  const [error, setError] = useState({});

  const [handleTypes, setHandleTypes] = useState([]);

  const [input, setInput] = useState({
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

  const resetState = () => {
    setInput({
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
  };

  let validateName = /^[a-z]+$/i;
  let validateNum = /^([0-9])*$/;

  // -----------------------------------------------------------------------------------------------------------------------------------
  // Validate.
  // -----------------------------------------------------------------------------------------------------------------------------------

  const validate = () => {
    let errors = {};
    if (!validateName.test(input.name) || !input.name) {
      errors.name = "Name required and must be letters";
    }
    if (!validateNum.test(input.hp) || input.hp < 1 || input.hp > 300) {
      errors.hp = "HP is require and must be a number between 0 and 300";
    }
    if (
      !validateNum.test(input.attack) ||
      input.attack < 10 ||
      input.attack > 500
    ) {
      errors.attack =
        "Attack is require and must be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.defense) ||
      input.defense < 10 ||
      input.defense > 100
    ) {
      errors.defense =
        "Defense is require and must be a number between 10 and 100";
    }
    if (
      !validateNum.test(input.speed) ||
      input.speed < 10 ||
      input.speed > 500
    ) {
      errors.speed = "Speed is require and must be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.height) ||
      input.height < 10 ||
      input.height > 300
    ) {
      errors.height =
        "Height is require and must be a number between 10 and 300";
    }
    if (
      !validateNum.test(input.weight) ||
      input.weight < 10 ||
      input.weight > 100
    ) {
      errors.weight =
        "Weight is require and must be a number between 10 and 100";
    }

    return errors;
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (handleTypes.find((x) => x === e.target.value)) {
      setInput({
        ...input,
        types: !input.types.includes(e.target.value)
          ? [...input.types, e.target.value]
          : input.types,
      });
      setHandleTypes(handleTypes.filter((x) => x !== e.target.value));
    } else {
      if (handleTypes.length === 2) return;
      setHandleTypes([...handleTypes, e.target.value]);
    }
  }

  function handleSubmitPost(e) {
    e.preventDefault();
    if (
      !error.name &&
      !error.hp &&
      !error.attack &&
      !error.defense &&
      !error.speed &&
      !error.height &&
      !error.weight &&
      !error.types
    ) {
      if (
        input.name.length !== 0 &&
        input.hp.length !== 0 &&
        input.attack.length !== 0
      ) {
        setInput({
          ...input,
          types: handleTypes.map((e) => input.types.push(e)),
        });
        console.log(input);
        dispatch(createPokemon(input));
        resetState();
        alert("Pokemon successfully created ");
      } else {
        alert("The form is required");
      }
    } else {
      alert("The form is required");
    }
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <h1>Create a Pokemon!</h1>

      <form onSubmit={(e) => handleSubmitPost(e)} className={style.form}>
        <div>
          <label>Name:</label>
          <input
            key="name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorN}>{error.name}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Hp:</label>
          <input
            key="hp"
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorH}>{error.hp}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Attack:</label>
          <input
            key="attack"
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorA}>{error.attack}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Defense:</label>
          <input
            key="defense"
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorD}>{error.defense}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Speed:</label>
          <input
            key="speed"
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorS}>{error.speed}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Height:</label>
          <input
            key="height"
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorHE}>{error.height}</p>}
        </div>

        <div className={style.inputLabel}>
          <label>Weight:</label>
          <input
            key="weight"
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorW}>{error.weight}</p>}
        </div>
        <div>
          <label>Choose the Type</label>
          <select
            name="types"
            onChange={(e) => handleSelect(e)}
            className={style.Selecttype}
          >
            {selectType.map((t, i) => {
              return (
                <option value={t.name} key={i}>
                  {t.name}
                </option>
              );
            })}
          </select>
          {!error ? null : <p className={style.errorT}>{error.types}</p>}
          {handleTypes.map((e, i) => {
            return (
              <div key={i} className={style.type}>
                <button
                  type="button"
                  onClick={() => handleChange(e)}
                  className={style.eliminate}
                >
                  X
                </button>
                <span>{e}</span>
              </div>
            );
          })}
        </div>

        <button type="submit" className={style.create}>
          Create
        </button>

        <Link to="/home">
          <button className={style.BtnBack}>Go back</button>
        </Link>
      </form>
    </div>
  );
}
