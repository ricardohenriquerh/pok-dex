import React from "react";
import styles from "./styles.css";

export const Pagination = ({
  pokemonsPerPage,
  totalPokemons,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={previousPage} className="left-arrow-button">
        <img className="left-arrow" src="./assets/left-arrow.svg" />
      </button>
      <ul className="pagination-numbers">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-individual-number"
          >
            {number}
          </li>
        ))}
      </ul>
      <button onClick={nextPage} className="right-arrow-button">
        <img className="right-arrow" src="./assets/right-arrow.svg" />
      </button>
    </div>
  );
};
