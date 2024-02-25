import React, { useState } from "react";
import styles from "./styles.css";

export const PokemonCard = ({ pokemon, showCardInfo }) => {
  const name = pokemon?.data.name ?? "";
  const number = pokemon?.data.id ?? 0;
  const types = pokemon?.data.types.map((type) => type.type.name) ?? [];
  const modalImage =
    pokemon?.data.sprites.other.dream_world.front_default ?? "";

  return (
    <>
      <div class={`container-info-modal ${showCardInfo ? "show-info" : ""} `}>
        <div className={`types-image-modal ${types[0]}`}>
          <img className="type-image" src={`./assets/${types[0]}.png`}></img>
        </div>
        <div className={`card-info`}>
          <img className="main-image" src={modalImage}></img>
          <span className="pokemon-name">{name}</span>
          <span className="pokemon-number">Nº {number}</span>

          <div className="type-info-container">
            {types?.map((type) => (
              <div className={`type-info ${type}`}>
                <img src={`./assets/${type + "-icon"}.png `}></img>
                <span className={`card-types pokemon-type`}>{type}</span>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
};
