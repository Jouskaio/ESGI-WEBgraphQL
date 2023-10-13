import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import SIZES_QUERY from "../services/api/queries/getSize";
import LOCATIONS_QUERY from "../services/api/queries/getLocations";
import MODELS_QUERY from "../services/api/queries/getModels";
import BRANDS_QUERY from "../services/api/queries/getBrands";
import SHOES_QUERY from "../services/api/queries/getShoes";
import SHOES_ADD from "../services/api/mutations/addShoe";
import MODELS_FROM_BRAND_QUERY from "../services/api/queries/getModelsFromBrand";
import client from "../services/api/apolloClient";

function NewShoe() {
  // SIZES
  const [sizes, setSizes] = useState([]);
  const { loading: sizesLoading, error: sizesError, data: sizesData } = useQuery(SIZES_QUERY);
  useEffect(() => {
    if (sizesData && sizesData.sizes) {
      setSizes(sizesData.sizes);
    }
  }, [sizesData]);

  // LOCATIONS
  const [locations, setLocations] = useState([]);
  const { loading: locationsLoading, error: locationsError, data: locationsData } = useQuery(LOCATIONS_QUERY);
  useEffect(() => {
    if (locationsData && locationsData.locations) {
      setLocations(locationsData.locations);
    }
  }, [locationsData]);

  // MODELS
  const [models, setModels] = useState([]);
  const { loading: modelsLoading, error: modelsError, data: modelsData } = useQuery(MODELS_QUERY);
  useEffect(() => {
    if (modelsData && modelsData.models) {
      setModels(modelsData.models);
    }
  }, [modelsData]);

  // BRANDS
  const [brands, setBrands] = useState([]);
  const { loading: brandsLoading, error: brandsError, data: brandsData } = useQuery(BRANDS_QUERY);
  useEffect(() => {
    if (brandsData && brandsData.brands) {
      setBrands(brandsData.brands);
    }
  }, [brandsData]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelsForSelectedBrand, setModelsForSelectedBrand] = useState([]);

  // FORM
  const [formData, setFormData] = useState({
    pricePurchase: 0,
    priceSold: 0,
    datePurchase: "",
    dateSold: "",
    brand: 1, // Changer la valeur initiale à une chaîne vide
    model: 1, // Changer la valeur initiale à une chaîne vide
    locationPurchaseKey: 1,
    locationSoldKey: 1,
    sizeKey: "",
    code: 1, // Vous pouvez utiliser la valeur par défaut souhaitée ici
  });

  const [addShoeMutation] = useMutation(SHOES_ADD, {
    refetchQueries: [{ query: SHOES_QUERY }], // Utilisez un objet pour définir la requête à refetch
  });

  const handleBrandChange = (e) => {
    const { value } = e.target;
    setSelectedBrand(value);
  };

  useEffect(() => {
    if (selectedBrand) {
      client.query({
        query: MODELS_FROM_BRAND_QUERY,
        variables: { value: selectedBrand },
      })
        .then(result => {
          setModelsForSelectedBrand(result.data.modelsByBrand);
        })
        .catch(error => {
          // Gérez les erreurs de la requête ici
          console.error("Error fetching models:", error);
        });
    } else {
      setModelsForSelectedBrand([]);
    }
  }, [selectedBrand]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addShoeMutation({
      variables: {
        pricePurchase: parseFloat(formData.pricePurchase),
        priceSold: parseFloat(formData.priceSold),
        datePurchase: formData.datePurchase,
        dateSold: formData.dateSold,
        locationPurchaseKey: parseInt(formData.locationPurchaseKey),
        locationSoldKey: parseInt(formData.locationSoldKey),
        sizeKey: parseInt(formData.sizeKey),
        code: formData.code,
        modelKey: parseInt(formData.model),
        brandKey: parseInt(formData.brand),
      },
    });
  }


  return (
    <div className="new-shoe">
      <h2>Add New Shoe</h2>
      <form onSubmit={handleSubmit} className="m-form">
        <nav>
          <label>
            Brand:
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange && handleBrandChange}
              required
              className={"m-form__a-select"}
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.key} value={brand.key}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Model:
            <select
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className={"m-form__a-select"}
            >
              <option value="">Select a model</option>
              {selectedBrand ? (
                (modelsForSelectedBrand || []).map((model) => (
                  <option key={model.key} value={model.key}>
                    {model.name}
                  </option>
                ))
              ) : null}
            </select>
          </label>
          <label>
            Code:
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </label>
        </nav>
        <nav>
          <label>
            Price Purchase:
            <input
              type="number"
              name="pricePurchase"
              value={formData.pricePurchase}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price Sold:
            <input
              type="number"
              name="priceSold"
              value={formData.priceSold}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date Purchase:
            <input
              type="date"
              name="datePurchase"
              value={formData.datePurchase}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date Sold:
            <input
              type="date"
              name="dateSold"
              value={formData.dateSold}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Location Purchase:
            <select
              name="locationPurchaseKey"
              value={formData.locationPurchaseKey}
              onChange={handleInputChange}
              required
              className={"m-form__a-select"}
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location.key} value={location.key}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Location Sold:
            <select
              name="locationSoldKey"
              value={formData.locationSoldKey}
              onChange={handleInputChange}
              required
              className={"m-form__a-select"}
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location.key} value={location.key}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Size:
            <select
              name="sizeKey"
              value={formData.sizeKey}
              onChange={handleInputChange}
              required
              className={"m-form__a-select"}
            >
              <option value="">Select a size</option>
              {sizes.map((size) => (
                <option key={size.key} value={size.key}>
                  {size.name}
                </option>
              ))}
            </select>
          </label>
        </nav>
        <button type="submit" className="m-form__a-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewShoe;
