import Query from "../services/api/query";
import SHOES_QUERY from "../services/api/queries/getShoes";
import SIZES_QUERY from "../services/api/queries/getSize"; // Importez la requête pour les tailles
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import timestampToDate from "../services/utils/formatDatetime";

function Homepage() {
  const [editableRows, setEditableRows] = useState({});
  const [shoeData, setShoeData] = useState({});
  const [sizeData, setSizeData] = useState([]); // État pour stocker les données de taille

  // Utilisez `useQuery` pour charger les données de taille au moment du montage du composant
  const { data: sizeQueryData, loading: sizeQueryLoading, error: sizeQueryError } = useQuery(SIZES_QUERY);

  const handleEditClick = (shoeKey) => {
    setEditableRows({
      ...editableRows,
      [shoeKey]: !editableRows[shoeKey],
    });
  };

  const handleInputChange = (e, shoeKey, fieldName) => {
    const { value } = e.target;
    setShoeData({
      ...shoeData,
      [shoeKey]: {
        ...shoeData[shoeKey],
        [fieldName]: value,
      },
    });
  };

  const handleSaveClick = (shoeKey) => {
    setEditableRows({
      ...editableRows,
      [shoeKey]: false,
    });

    // TODO: Effectuer une mutation pour mettre à jour les données
  };

    return (
    <div>
      <Query query={SHOES_QUERY} id={null}>
        {({ data: { shoes } }) => {
          return (
            <table className={"m-table"}>
              <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Size</th>
                <th>Purchased</th>
                <th>Date</th>
                <th>Sold</th>
                <th>Date</th>
                <th>Price</th>
                <th>Price Sold</th>
                <th></th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {shoes.map((shoe, index) => (
                <tr key={index}>
                  <td>{shoe.key}</td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="text"
                        value={shoeData[shoe.key]?.code || shoe.code}
                        onChange={(e) => handleInputChange(e, shoe.key, "code")}
                      />
                    ) : (
                      shoe.code
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <select
                        value={shoeData[shoe.key]?.size || shoe.size.key}
                        onChange={(e) => handleInputChange(e, shoe.key, "size")}
                      >
                        <option value="">Select a size</option>
                        {sizeData.map((size) => (
                          <option key={size.key} value={size.key}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shoe.size.name
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="text"
                        value={shoeData[shoe.key]?.locationPurchase || shoe.locationPurchase.name}
                        onChange={(e) => handleInputChange(e, shoe.key, "locationPurchase")}
                      />
                    ) : (
                      shoe.locationPurchase.name
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="date"
                        value={timestampToDate(shoeData[shoe.key]?.datePurchase) || timestampToDate(shoe.datePurchase)}
                        onChange={(e) => handleInputChange(e, shoe.key, "datePurchase")}
                      />
                    ) : (
                      timestampToDate(shoe.datePurchase)
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="text"
                        value={shoeData[shoe.key]?.locationSold || shoe.locationSold.name}
                        onChange={(e) => handleInputChange(e, shoe.key, "locationSold")}
                      />
                    ) : (
                      shoe.locationSold.name
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="date"
                        value={timestampToDate(shoeData[shoe.key]?.dateSold) || timestampToDate(shoe.dateSold)}
                        onChange={(e) => handleInputChange(e, shoe.key, "dateSold")}
                      />
                    ) : (
                      timestampToDate(shoe.dateSold)
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="text"
                        value={shoeData[shoe.key]?.pricePurchase || shoe.pricePurchase}
                        onChange={(e) => handleInputChange(e, shoe.key, "pricePurchase")}
                      />
                    ) : (
                      shoe.pricePurchase
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="text"
                        value={shoeData[shoe.key]?.priceSold || shoe.priceSold}
                        onChange={(e) => handleInputChange(e, shoe.key, "priceSold")}
                      />
                    ) : (
                      shoe.priceSold
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <button
                        className={"m-table__a-button m-table__a-button--edit"}
                        onClick={() => handleSaveClick(shoe.key)}
                      >
                        <img
                          className={"m-table__a-icon"}
                          src={"/tick.png"}
                          alt={"OK"}
                        />
                      </button>
                    ) : (
                      <button
                        className={"m-table__a-button m-table__a-button--edit"}
                        onClick={() => handleEditClick(shoe.key)}
                      >
                        <img
                          className={"m-table__a-icon"}
                          src={editableRows[shoe.key] ? "/tick.png" : "/edit.png"}
                          alt={editableRows[shoe.key] ? "OK" : "Edit"}
                        />
                      </button>
                    )}
                  </td>
                  <td>
                    <button className={"m-table__a-button m-table__a-button--delete"}>
                      <img className={"m-table__a-icon"} src={"/delete.png"} alt={"Delete"} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          );
        }}
      </Query>
    </div>
  );
}

export default Homepage;
