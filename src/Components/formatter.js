import React, { useEffect, useState } from "react";
import axios from "axios";

const Formatter = () => {
  const [productId, setProductId] = useState("");
  const [fetchedProductObject, setfetchedProductObject] = useState();
  const [inputtedCountry, setInputtedCountry] = useState();
  const [inputtedMaterials, setInputtedMaterials] = useState([]);
  const [inputtedDescription, setInputtedDescription] = useState();
  const [discriptionArray, setDescriptionArray] = useState();
  const [newDescription, setNewDescription] = useState("");
  const [numberOfElements, setNumberOfElements] = useState(1);

  const changeDescriptionInputToArray = () => {
    setDescriptionArray(inputtedDescription.split("-"));
  };
  const updateNewDescription = () => {
    const newElement = (
      <p>
        {fetchedProductObject
          ? fetchedProductObject["product"]["vendor"]
          : "Vendor"}{" "}
        {fetchedProductObject
          ? fetchedProductObject["product"]["title"]
          : "Title"}
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
        {inputtedMaterials
          ? inputtedMaterials.map((materials, i) => {
              if (i !== 0 && elementsArray.length >= i) {
                return `, ${materials}`;
              } else if (elementsArray.length >= i) {
                return `${materials}`;
              }
            })
          : "50% Materials, 50% Materials"}
        <br></br>
        {fetchedProductObject
          ? fetchedProductObject["product"]["variants"][0]["sku"]
          : "SKU code"}
      </p>
    );
    setNewDescription(newElement);
  };
  const elementsArray = Array.from(
    { length: numberOfElements },
    (_, index) => index
  );
  const addingToMaterialArray = (index, input) => {
    const Array = inputtedMaterials;
    Array[index] = input;
    setInputtedMaterials(Array);
    console.log(inputtedMaterials);
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
  useEffect(updateNewDescription);
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
        <div>
          {elementsArray.map((index) => (
            <input
              onChange={(e) => {
                addingToMaterialArray(index, e.target.value);
              }}
              placeholder="Composition "
            />
          ))}
        </div>{" "}
        <div>
          <p>Amount of fabrics</p>
          <button onClick={() => setNumberOfElements(numberOfElements + 1)}>
            +
          </button>{" "}
          <button onClick={() => setNumberOfElements(numberOfElements - 1)}>
            -
          </button>
        </div>
        <div>
          <input
            onChange={(e) => {
              setInputtedCountry(e.target.value);
            }}
            placeholder="Country"
          />{" "}
        </div>
        <textarea
          onChange={(e) => {
            setDescriptionArray(e.target.value.split("\n"));
          }}
          placeholder="New Description"
        />
      </div>
      <h2>Description Preview</h2>
      {newDescription}
      <button onClick={updateProductDescription}>Update Description</button>
    </div>
  );
};

export default Formatter;
