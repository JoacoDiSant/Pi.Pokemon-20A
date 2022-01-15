import React from "react";

function Pokemon({ name, image, types, createInDatabase }) {
  console.log(createInDatabase)
  let tipodb = createInDatabase
    ? types.map((e) => {
        const nameType = e.name;
        return <h5>{nameType}</h5>;
      })
    : types.map((e) => {
        return <h5>{e}</h5>;
      });

  return (
    <div className="pokemon">
      <h1 className="name">{name}</h1>
      <img src={image} alt={`pokemon ${name}`} className="imagen" />
      <div className="tipos">{tipodb}</div>
    </div>
  );
}

export default Pokemon;
