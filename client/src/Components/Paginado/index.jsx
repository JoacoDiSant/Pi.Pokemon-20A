import React from "react";
import "./Paginado.css";

function Paginado({ PokemonPerPage, pokemon, Paginado }) {
  const NumberPage = [];

  for (let i = 0; i < Math.ceil(pokemon / PokemonPerPage); i++) {
    NumberPage.push(i + 1);
  }

  return (
    <div className="paginado">
      {NumberPage &&
        NumberPage.map((n) => {
          return (
            <button 
            key={n}
            onClick={() => Paginado(n)} 
            className="page">
              {n}
            </button>
          );
        })}
    </div>
  );
}

export default Paginado;
