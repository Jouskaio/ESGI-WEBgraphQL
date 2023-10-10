import Query from "../services/api/query";
import SHOES_QUERY from "../services/api/queries/getShoes";
import React, { useState } from "react";
import { formatDateForInput } from "../services/utils/formatDate";

function Homepage() {
  const [editableRows, setEditableRows] = useState({});
  const [shoeData, setShoeData] = useState({}); // État pour stocker les données modifiées

  const handleEditClick = (shoeKey) => {
    setEditableRows({
      ...editableRows,
      [shoeKey]: !editableRows[shoeKey],
    });
  };

  const handleInputChange = (e, shoeKey, fieldName) => {
    const { value } = e.target;

    // Mettre à jour les données modifiées dans l'état
    setShoeData({
      ...shoeData,
      [shoeKey]: {
        ...shoeData[shoeKey],
        [fieldName]: value,
      },
    });
  };

  const handleSaveClick = (shoeKey) => {
    // Envoyer les données modifiées au serveur ou effectuer toute autre action nécessaire
    // Réinitialiser l'état des champs modifiés
    setEditableRows({
      ...editableRows,
      [shoeKey]: false,
    });

    console.log(shoeData);
    // TODO : Faite une mutation pour mettre à jour les données

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
                          value={shoeData[shoe.key]?.code || shoe.code} // Afficher la valeur modifiée ou l'ancienne valeur
                          onChange={(e) => handleInputChange(e, shoe.key, "code")}
                        />
                      ) : (
                        shoe.code
                      )}
                    </td>
                    <td>
                      {editableRows[shoe.key] ? (
                        <input
                          type="text"
                          value={shoeData[shoe.key]?.size || shoe.size.name}
                          onChange={(e) => handleInputChange(e, shoe.key, "size")}
                        />
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
                          value={shoeData[shoe.key]?.datePurchase || formatDateForInput(shoe.datePurchase)}
                          onChange={(e) => handleInputChange(e, shoe.key, "datePurchase")}
                        />
                      ) : (
                        shoe.datePurchase
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
                          value={shoeData[shoe.key]?.dateSold || formatDateForInput(shoe.dateSold)}
                          onChange={(e) => handleInputChange(e, shoe.key, "dateSold")}
                        />
                      ) : (
                        shoe.dateSold
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
