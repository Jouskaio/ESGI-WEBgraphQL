import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import SHOES_ADD from "../services/api/mutations/addShoe";

function NewShoe() {
  const [formData, setFormData] = useState({
    pricePurchase: 0,
    priceSold: 0,
    datePurchase: "",
    dateSold: "",
    locationPurchaseKey: "",
    locationSoldKey: "",
    sizeKey: "",
    code: "",
  });


  const [addShoeMutation, { loading, error }] = useMutation(SHOES_ADD);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mutation started:", formData);
    addShoeMutation({
      variables: {
        pricePurchase: parseFloat(formData.pricePurchase),
        priceSold: parseFloat(formData.priceSold),
        datePurchase: formData.datePurchase,
        dateSold: formData.dateSold,
        locationPurchaseKey: formData.locationPurchaseKey,
        locationSoldKey: formData.locationSoldKey,
        sizeKey: formData.sizeKey,
        code: formData.code,
      },
    })
      .then((result) => {
        console.log("Mutation successful:", result);
        // Réinitialisez le formulaire ou effectuez toute autre action nécessaire après la mutation réussie
      })
      .catch((err) => {
        console.error("Mutation error:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={"m-form"}>
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
        <input
          type="text"
          name="locationPurchaseKey"
          value={formData.locationPurchaseKey}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Location Sold:
        <input
          type="text"
          name="locationSoldKey"
          value={formData.locationSoldKey}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Size:
        <input
          type="text"
          name="sizeKey"
          value={formData.sizeKey}
          onChange={handleInputChange}
          required
        />
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewShoe;
