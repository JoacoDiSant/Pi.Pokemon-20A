import React from "react";
import { Link } from "react-router-dom";
import style from './indexE.module.css'

function index() {
  return (
    <div className={style.ErrorCont}>
      <h1 className={style.cuatrocerocuatro}>UPS!!</h1>
      <h1 className={style.error}>OCURRIO UN</h1>
      <h1 className={style.error1}>ERROR</h1>
      <Link to="/home" className={style.back}>
        <h1 className={style.backbtn}>VOLVER</h1>
      </Link>
    </div>
  );
}

export default index;
