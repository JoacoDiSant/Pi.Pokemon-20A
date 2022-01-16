import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Pokemons from "./Components/Home/Pokemons";
import LandingPage from "./Components/Landing/LandingPage";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";
import Detail from './Components/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Pokemons} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/create" component={CreatePokemon} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
