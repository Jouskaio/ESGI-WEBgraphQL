import React, { useState } from "react";
import {ModelsPaginationQuery} from "../services/api/queries/getModelsPagination";

function Brands() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10; // Nombre d'éléments à afficher par page

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ModelsPaginationQuery start={currentPage * perPage} offset={perPage}>
      {({ data: { models } }) => {
        return (
          <div className={"l-brands"}>
            <table className={"m-table m-table--brands"}>
              <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
              </tr>
              </thead>
              <tbody>
              {models.map((model, index) => (
                <tr key={index}>
                  <td>{model.brand.name}</td>
                  <td>{model.name}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="l-brands__pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 0}>
                Previous
              </button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </div>
        );
      }}
    </ModelsPaginationQuery>
  );
}

export default Brands;
