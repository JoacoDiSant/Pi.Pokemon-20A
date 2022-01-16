import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterByTypes,
  getTypes,
  FilterCreated,
  OrdenAlphabeth,
  Ordenfuerza,
} from "../../StoreFiles/actions";

function Filters() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);


  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleFiltType(e) {
    e.preventDefault();
    dispatch(FilterByTypes(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(FilterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(OrdenAlphabeth(e.target.value));
  }

  function handleAttack(e) {
    e.preventDefault();
    dispatch(Ordenfuerza(e.target.value));
  }

  return (
    <div>
      <div>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="api" key="API">
            BY Pokedex
          </option>
          <option value="Database" key="Database">
            BY Database
          </option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="A-Z" key="A-Z">
            A to Z
          </option>
          <option value="Z-A" key="Z-A">
            Z to A
          </option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleAttack(e)}>
          <option value="strong" key="Mayor">
            stronger to weaker
          </option>
          <option value="weack" key="Menor">
            weaker to stronger
          </option>
        </select>
      </div>
      <select onChange={(e) => handleFiltType(e)}>
        <option value="All">Filter Type</option>
        {types.map((t, i) => {
          return (
            <option value={t.name} key={i}>
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filters;

/*

*/
