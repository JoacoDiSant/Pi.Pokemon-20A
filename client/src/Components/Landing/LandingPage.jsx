import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  
  return (
    <div className="landing">
      <h1 className="name">WELCOME TO MY POKEAPP</h1>
      <Link to="/home" className="a">
        <span className="button">ENTER</span>
      </Link>
    </div>
  );
}

export default LandingPage
