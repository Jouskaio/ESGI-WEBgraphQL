import React, { useEffect, useState } from "react";
import Query from "../services/api/query";
import SHOES_QUERY from "../services/api/queries/getShoes";
import SIZES_QUERY from "../services/api/queries/getSize";
import LOCATIONS_QUERY from "../services/api/queries/getLocations";
import {useMutation, useQuery} from "@apollo/client";
import timestampToDate from "../services/utils/formatDatetime";
import BRANDS_QUERY from "../services/api/queries/getBrands";
import client from "../services/api/apolloClient";
import MODELS_FROM_BRAND_QUERY from "../services/api/queries/getModelsFromBrand";
import MODELS_QUERY from "../services/api/queries/getModels";
import SHOE_QUERY from "../services/api/queries/getShoe";
import SHOES_EDIT from "../services/api/mutations/updateShoe";
import SHOE_DELETE from "../services/api/mutations/deleteShoe";

function Homepage() {
  const [editableRows, setEditableRows] = useState({});
  const [shoeData, setShoeData] = useState({});
  const [shoes, setShoes] = useState([]);
  const [editingShoeKey, setEditingShoeKey] = useState(null);
  const [deleteShoeMutation] = useMutation(SHOE_DELETE);
  const [originalShoeData, setOriginalShoeData] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelsForSelectedBrand, setModelsForSelectedBrand] = useState({});
  const { data: sizeQueryData, loading: sizeQueryLoading, error: sizeQueryError } = useQuery(SIZES_QUERY);
  const [updateShoeMutation] = useMutation(SHOES_EDIT);
  const { data: locationQueryData, loading: locationQueryLoading, error: locationQueryError } = useQuery(LOCATIONS_QUERY);
  const { loading: modelsLoading, error: modelsError, data: modelsData } = useQuery(MODELS_QUERY);
  const { loading: brandsLoading, error: brandsError, data: brandsData } = useQuery(BRANDS_QUERY);

  useEffect(() => {
    if (modelsData && modelsData.models) {
      setModels(modelsData.models);
    }
  }, [modelsData]);

  useEffect(() => {
    if (brandsData && brandsData.brands) {
      setBrands(brandsData.brands);
    }
  }, [brandsData]);

  useEffect(() => {
    if (editingShoeKey !== null) {
      // Une fois que les données de taille sont chargées, vous pouvez maintenant charger les chaussures
      console.log("KEY " + editingShoeKey)
      client
        .query({
          query: SHOE_QUERY,
          variables: { value: parseInt(editingShoeKey) },
        })
        .then((result) => {
          // Renommez cette variable pour éviter la collision
          const loadedShoes = result.data.shoe;
          setShoes(loadedShoes);
        })
        .catch((error) => {
          console.error("Error fetching shoes:", error);
        });
    }
  }, [editingShoeKey]);

  useEffect(() => {
    if (selectedBrand ) {
      client
        .query({
          query: MODELS_FROM_BRAND_QUERY,
          variables: { value: selectedBrand },
        })
        .then((result) => {
          const modelsData = result.data.modelsByBrand;
          // Assurez-vous que modelsForSelectedBrand est un tableau
          if (Array.isArray(modelsData)) {
            setModelsForSelectedBrand(modelsData);
          } else {
            setModelsForSelectedBrand([]); // Si ce n'est pas un tableau, initialisez-le comme un tableau vide
          }
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
        });
    } else {
      setModelsForSelectedBrand([]); // Si selectedBrand est vide, initialisez modelsForSelectedBrand comme un tableau vide
    }
  }, [selectedBrand]);

  const handleEditClick = (shoeKey) => {
    // Récupérez les données originales de la chaussure correspondante
    setEditingShoeKey(shoeKey);

    // Stockez les données originales dans originalShoeData
    setOriginalShoeData({
      ...originalShoeData,
      [shoeKey]: shoes,
    });

    // Initialisez currentData avec les données actuelles de la chaussure
    setShoeData({
      ...shoeData,
      [shoeKey]: { ...shoes },
    });

    setEditableRows({
      ...editableRows,
      [shoeKey]: true,
    });
  };

  const handleInputChange = (e, shoeKey, fieldName) => {
    const { value } = e.target;

    // Mettez à jour les données modifiées dans currentData
    setShoeData((prevShoeData) => ({
      ...prevShoeData,
      [shoeKey]: {
        ...prevShoeData[shoeKey],
        [fieldName]: value,
      },
    }));
  };

  const handleSaveClick = (shoeKey) => {
    setEditableRows({
      ...editableRows,
      [shoeKey]: false,
    });

    const currentData = shoeData[shoeKey] || {};
    let originalData = shoes;
    originalData = []
    originalData["key"] = shoes["key"]
    originalData["code"] = shoes["code"]
    originalData["pricePurchase"] = shoes["pricePurchase"]
    originalData["priceSold"] = shoes["priceSold"]
    originalData["datePurchase"] = shoes["datePurchase"]
    originalData["dateSold"] = shoes["dateSold"]
    originalData["locationPurchase"] = shoes["locationPurchase"]["key"]
    originalData["locationSold"] = shoes["locationSold"]["key"]
    originalData["size"] = shoes["size"]["key"]
    //originalData["model"] = shoes["model"]["key"]
    //originalData["brand"] = shoes["brand"]["key"]
    //originalData["color"] = shoes["color"]["key"]

    console.log(originalData)
    if (currentData && originalData) {
      const isDifferent = Object.keys(currentData).some(
        (key) => currentData[key] !== originalData[key]
      );


      if (isDifferent) {
        console.log(currentData)
        // Exécutez la mutation ici pour mettre à jour les données
        updateShoeMutation({
          variables: {
            key: shoeKey,
            pricePurchase: currentData.pricePurchase,
            priceSold: currentData.priceSold,
            datePurchase: currentData.datePurchase,
            dateSold: currentData.dateSold,
            code: currentData.code,
            sizeKey: currentData.size,
            locationPurchaseKey: currentData.locationPurchase,
            locationSoldKey: currentData.locationSold,
          },
        }).then((result) => {
          // Gérez la réponse de la mutation ici (succès, erreur, etc.)
          // Vous pouvez également accéder à finalData ici si nécessaire.
        });
      } else {
        console.log("Data has not changed for shoe with key", shoeKey);
      }
      } else {
        console.log("Data has not changed for shoe with key", shoeKey);
      }
    }

  const handleDeleteClick = (shoeKey) => {
    // Appelez la mutation pour supprimer la chaussure
    deleteShoeMutation({
      variables: { key: shoeKey },
    })
      .then((result) => {
        // Gérez la réponse de la mutation ici (succès, erreur, etc.)
        console.log("Shoe deleted successfully");
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error("Error deleting shoe:", error);
      });
  };

    return (
    <div>
      {sizeQueryLoading ? (
        console.log("Metadata Loading...")
      ) : (
      <Query query={SHOES_QUERY} id={null}>
        {({ data: { shoes } }) => {
          return (
            <table className={"m-table"}>
              <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Size</th>
                <th>Brand</th>
                <th>Model</th>
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
                        {sizeQueryData.sizes.map((size) => (
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
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                          <option key={brand.key} value={brand.key}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shoe.brand.name
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <select
                        value={shoeData[shoe.key]?.model || shoe.model}
                        onChange={(e) => handleInputChange(e, shoe.key, "model")}
                      >
                        <option value="">Select a model</option>
                        {modelsForSelectedBrand.map((model) => (
                          <option key={model.key} value={model.key}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shoe.model.name
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <select
                        value={shoeData[shoe.key]?.locationPurchase || shoe.locationPurchase?.key}
                        onChange={(e) => handleInputChange(e, shoe.key, "locationPurchase")}
                      >
                        <option value="">Select a location</option>
                        {locationQueryData.locations.map((location) => (
                          <option key={location.key} value={location.key}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shoe.locationPurchase.name || "N/A"
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="date"
                        value={shoeData[shoe.key]?.datePurchase || timestampToDate(shoe.datePurchase)}
                        onChange={(e) => handleInputChange(e, shoe.key, "datePurchase")}
                      />
                    ) : (
                      timestampToDate(shoe.datePurchase)
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <select
                        value={shoeData[shoe.key]?.locationSold || shoe.locationSold?.key}
                        onChange={(e) => handleInputChange(e, shoe.key, "locationSold")}
                      >
                        <option value="">Select a location</option>
                        {locationQueryData.locations.map((location) => (
                          <option key={location.key} value={location.key}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      shoe.locationSold.name || "N/A"
                    )}
                  </td>
                  <td>
                    {editableRows[shoe.key] ? (
                      <input
                        type="date"
                        value={shoeData[shoe.key]?.dateSold || timestampToDate(shoe.dateSold)}
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
                    <button
                      className={"m-table__a-button m-table__a-button--delete"}
                      onClick={() => handleDeleteClick(shoe.key)}
                    >
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
      )}
    </div>
  );
}

export default Homepage;
