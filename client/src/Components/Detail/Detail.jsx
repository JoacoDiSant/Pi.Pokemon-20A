import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonById } from "../../StoreFiles/actions";
import { useEffect } from "react";
import style from "./Detail.module.css";

function Detail(props) {
  const dispatch = useDispatch();

  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props]);

  return (
    <div className={style.detail}>
      <h1 className={style.name}>{details.name}</h1>
      <h3 className={style.types}>{details.types}</h3>
      <h4 className={style.info}>Hp {details.hp}</h4>
      <h4 className={style.info}>Attack {details.attack}</h4>
      <h4 className={style.info}>Defense {details.defense}</h4>
      <h4 className={style.info}>Speed {details.speed}</h4>
      <h4 className={style.info}>Height {details.height}</h4>
      <h4 className={style.info}>Weight {details.weight}</h4>
      <img src={details.image} alt="" />
      <Link to="/home" className={style.back}>Go Back</Link>
    </div>
  );
}

export default Detail;
