import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonById } from "../../StoreFiles/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

function Detail(props) {
  const details = useSelector((state) => state.details);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props]);

  if (details) {
    const pokeDet = () => (
      <div className={style.detail}>
        <Link to="/home" className={style.back}>
          Go Back
        </Link>
        <h1 className={style.name}>{details.name}</h1>
        <div className={style.types}>
          {details.createInDatabase ? (
            details.types.map((e) => {
              const nameType = e.name;
              return <h3>{nameType}</h3>;
            })
          ) : (
            <h3>{details.types}</h3>
          )}
        </div>
        <h4 className={style.info}>Hp {details.hp}</h4>
        <h4 className={style.info}>Attack {details.attack}</h4>
        <h4 className={style.info}>Defense {details.defense}</h4>
        <h4 className={style.info}>Speed {details.speed}</h4>
        <h4 className={style.info}>Height {details.height}</h4>
        <h4 className={style.info}>Weight {details.weight}</h4>
        <img src={details.image} alt="" />
      </div>
    );
    return details.name ? pokeDet() : <Loading />;
  }
}
export default Detail;
