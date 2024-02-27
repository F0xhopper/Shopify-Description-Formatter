import React, { useEffect, useState } from "react";
import axios from "axios";

const Formatter = () => {
  const [productId, setProductId] = useState("");
  const [fetchedProductObject, setfetchedProductObject] = useState();
  const [descriptionFormat, setDescriptionFormat] = useState("");
  const [newDescription, setNewDescription] = useState("Vendor Title\n");
  const [propertyInput, setPropertyInput] = useState({});
  const arrayOfProperties = ["title", "vendor", "price", "id", "variants"];

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
  function combineInputsAndFormat() {
    let format = descriptionFormat;
    arrayOfProperties.forEach((property) => {
      if (propertyInput[property]) {
        format = format.replace(property, propertyInput[property]);
      }
    });
    setNewDescription(format);
  }
  useEffect(() => {
    combineInputsAndFormat();
  });
  return (
    <div>
      <div>
        {arrayOfProperties.map((property) => {
          if (descriptionFormat.includes(property)) {
            return (
              <input
                placeholder={property}
                onChange={(e) => {
                  setPropertyInput({
                    ...propertyInput,
                    [property]: e.target.value,
                  });
                  console.log(propertyInput);
                }}
              ></input>
            );
          }
        })}
      </div>
      <textarea
        className="formatInput"
        onChange={(e) => {
          setDescriptionFormat(e.target.value);
        }}
      ></textarea>{" "}
      <h2>Description Preview</h2>
      <p className="newDescriptionParargraph">
        <pre>{newDescription}</pre>
      </p>
      <button>Update Description</button>
    </div>
  );
};

export default Formatter;
