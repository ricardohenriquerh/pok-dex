import React from "react";
import styles from "./styles.css";

export const Navbar = ({ pokemonFilter }) => {
  return (
    <div className="navbar-container">
      <img
        className="pokemon-logo"
        src={"./assets/pokemon-logo-black.png"}
      ></img>
      <div className="navbar-search">
        <label className="search-label">Buscar um pokémon:</label>
        <input
          onChange={(e) => pokemonFilter(e.target.value)}
          className="navbar-input"
          type="text"
        ></input>
      </div>
    </div>
  );
};
