import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function LandingPage() {
  return (
    <div className={style.landing}>
      <h1 className={style.title}>WELCOME TO MY POKEAPP</h1>
      <Link to="/home" className={style.a}>
        ENTER
      </Link>
    </div>
  );
}

export default LandingPage;
