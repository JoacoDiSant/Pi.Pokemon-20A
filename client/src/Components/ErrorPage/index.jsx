import React from "react";
import { Link } from "react-router-dom";
import style from './indexE.module.css'

function index() {
  return (
    <div className={style.ErrorCont}>
      <h1 className={style.cuatrocerocuatro}>404</h1>
      <h1 className={style.error}>ERROR</h1>
      <Link to="/home">
        <h1 className={style.back}>GO BACK</h1>
      </Link>
    </div>
  );
}

export default index;
