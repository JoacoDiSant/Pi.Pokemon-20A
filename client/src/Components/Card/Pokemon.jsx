import React from "react";
import { Link } from "react-router-dom";
import style from "./pokemon.module.css";

function Pokemon({ id, name, image, types, createInDatabase }) {
  let tipodb = createInDatabase
    ? types.map((e) => {
        const nameType = e.name;
        console.log(nameType)
        return <h5>{nameType}</h5>;
      })
    : types.map((e) => {
        return <h5>{e}</h5>;
      });

  return (
    <Link to={`/detail/${id}`} className={style.a}>
      <div className={style.pokemon}>
        <h1 className={style.name}>{name}</h1>
        <img src={image} alt={`pokemon ${name}`} className={style.imagen} />
        <div className={style.tipos}>{tipodb}</div>
      </div>
    </Link>
  );
}

export default Pokemon;
