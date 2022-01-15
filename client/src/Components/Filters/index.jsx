import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterByTypes, getTypes } from "../../StoreFiles/actions";

function Filters() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleFiltType(e){
    e.preventDefault()
    dispatch(FilterByTypes(e.target.value))
  }



  return (
    <div>
      <select>
        <option value="0">Filter by</option>
        <optgroup label="origin">
          <option value="api" key="API">
            BY Pokedex
          </option>
          <option value="db" key="Database">
            BY Database
          </option>
        </optgroup>
        <optgroup label="Ascendente">

        </optgroup>
        <optgroup label="Descendente">

        </optgroup>
      </select>
      <select onChange={(e) => handleFiltType(e)}>
          <option value="All">Filter Type</option>
          {types.map((t, i) => {
            return (
              <option value={t.name} key={i} >
                {t.name}
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
