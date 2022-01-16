import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, createPokemon } from "../../StoreFiles/actions";

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
    image:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png"
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
        image:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png"
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
    <div className="CreateForm">
      <div className="header">
        <h1>CREATE YOUR OWN POKEMON</h1>
      </div>
      <div className="Form">
        <form onSubmit={(e) => handelSubmitPost(e)}>
          <div className="Formulario">
            <div>
              <label className="FormName">Name</label>
              <input
                type="text"
                className="InputName"
                value={Create.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormHp">Hp</label>
              <input
                type="number"
                className="InputHp"
                value={Create.hp}
                name="hp"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormAttack">Attack</label>
              <input
                type="number"
                className="InputAttack"
                value={Create.attack}
                name="attack"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormDefense">Defense</label>
              <input
                type="number"
                className="InputDefense"
                value={Create.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormSpeed">Speed</label>
              <input
                type="number"
                className="InputSpeed"
                value={Create.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormHeight">Height</label>
              <input
                type="number"
                className="InputHeight"
                value={Create.height}
                name="height"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="FormWeight">Weight</label>
              <input
                type="number"
                className="InputWeight"
                value={Create.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="SelectTypes">
            <label className="SelectTypes">Choose the Type</label>
            <select name="type" onChange={(e) => handleSelect(e)}>
              {SelectType.map((t, i) => {
                return (
                  <option value={t.name} key={i}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <br></br>
            {Create.types.map((e, i) => {
              return (
                <div key={i}>
                  <button
                    type="button"
                    className="EliminateType"
                    onClick={() => handleDelete(e)}
                  >
                    X
                  </button>
                  <span>{e}</span>
                </div>
              );
            })}
          </div>
          <button type="submit" className="CreateBtn">
            Create Pokemon
          </button>
        </form>
        <Link to="/home">
          <button className="BtnBack">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default PokemonCreate;
