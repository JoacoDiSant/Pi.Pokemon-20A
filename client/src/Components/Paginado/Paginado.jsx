import React from "react";
import style from './Paginado.module.css'

function Paginado({ PokemonPorPagina, pokemon, Paginado }) {
  const NumberPage = [];

  for (let i = 0; i < Math.ceil(pokemon / PokemonPorPagina); i++) {
    NumberPage.push(i + 1);
  }

  return (
    <div className={style.paginado}>
      {NumberPage &&
        NumberPage.map((n) => {
          return (
            <button key={n} onClick={() => Paginado(n)} className={style.page}>
              {n}
            </button>
          );
        })}
    </div>
  );
}

export default Paginado;
