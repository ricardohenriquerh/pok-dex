import React, { useEffect, useState } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard";
import styles from "./styles.css";
import { Navbar } from "../components/Navbar";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(20);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [pokemonModal, setPokemonModal] = useState();

  const handleCardClick = (pokemon) => {
    setShowCardInfo(true);
    setPokemonModal(pokemon);
  };

  const handleOverlayClick = () => {
    setShowCardInfo(false);
  };

  const indexOfLastPokemons = currentPage * pokemonsPerPage;
  const indexOfFirstPokemons = indexOfLastPokemons - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemons,
    indexOfLastPokemons
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(pokemons.length / pokemonsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPokemons = () => {
    let endpoints = [];
    for (var i = 1; i < 100; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err));
  };

  const pokemonFilter = (name) => {
    const filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }

    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };

  console.log(pokemons);
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <Navbar pokemonFilter={pokemonFilter} />
      <div className="container">
        <div className="container-pokemon-wrapper">
          {currentPokemons.map((pokemon) => {
            const imageUrl = pokemon.data.sprites.front_default;
            const types = pokemon.data.types.map((type) => type.type.name);

            return (
              <>
                <div
                  onClick={() => handleCardClick(pokemon)}
                  className={`card-container ${types[0]}`}
                >
                  <div className={`card-image `}>
                    <img src={imageUrl} />
                  </div>
                </div>
              </>
            );
          })}

          <PokemonCard showCardInfo={showCardInfo} pokemon={pokemonModal} />
        </div>

        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={pokemons.length}
          paginate={paginate}
          nextPage={nextPage}
          previousPage={previousPage}
          showCardInfo={showCardInfo}
        />
      </div>
      <div
        onClick={handleOverlayClick}
        className={`overlay ${showCardInfo ? "overlay-show" : ""}`}
      ></div>
    </>
  );
};
