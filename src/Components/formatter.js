import React, { useState } from "react";
import axios from "axios";

const Formatter = () => {
  const [productId, setProductId] = useState("");
  const [fetchedProductObject, setfetchedProductObject] = useState();
  const [inputtedCountry, setInputtedCountry] = useState();
  const [inputtedMaterials, setInputtedMaterials] = useState();
  const [inputtedDescription, setInputtedDescription] = useState();
  const [discriptionArray, setDescriptionArray] = useState();
  const [newDescription, setNewDescription] = useState("");

  const changeDescriptionInputToArray = () => {
    setDescriptionArray(inputtedDescription.split("-"));
  };
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        "https://your-shop-name.myshopify.com/api/2021-10/products/{product_id}.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "YOUR_ACCESS_TOKEN",
          },
        }
      );
      setfetchedProductObject(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const updateProductDescription = async () => {
    try {
      const response = await axios.put(
        `https://{your-store-name}.myshopify.com/admin/api/2021-10/products/${productId}.json`,
        {
          product: {
            id: productId,
            body_html: newDescription,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": "{your-access-token}",
          },
        }
      );
      console.log("Updated product:", response.data.product);
    } catch (error) {
      console.error("Error updating product description:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button>Get Product Info</button>
      </div>
      <div>
        <input placeholder="Materials" />
        <input
          onChange={(e) => {
            setInputtedCountry(e.target.value.capitalize());
          }}
          placeholder="Country"
        />
        <textarea
          onChange={(e) => {
            setDescriptionArray(e.target.value.split(","));
          }}
          placeholder="New Description"
        />
      </div>
      <h2>Description Preview</h2>
      <p
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      >
        {fetchedProductObject ? fetchedProductObject.vendor : "Vendor"}{" "}
        {fetchedProductObject ? fetchedProductObject.title : "Title"}
        <br></br> <br></br>
        {discriptionArray
          ? discriptionArray.map((item) => (
              <React.Fragment>
                {item}
                <br />
              </React.Fragment>
            ))
          : "Description"}{" "}
        <br></br> <br></br>
        Made in {inputtedCountry ? inputtedCountry : "Country"} <br></br>
        {inputtedMaterials ? inputtedMaterials : "50% Materials, 50% Materials"}
        <br></br>
        {fetchedProductObject ? fetchedProductObject.variant.sku : "SKU code"}
      </p>
      <button onClick={updateProductDescription}>Update Description</button>
    </div>
  );
};

export default Formatter;
