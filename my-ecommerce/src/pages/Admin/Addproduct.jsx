import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    productCode: "",
    description: "",
    descriptionAll: "",
    warranty: "",
    quantity: "",
    size: [""],
    color: [""],
    category: "",
    fabricQuality: "",
    mainImage: null,
    images: [],
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDynamicChange = (index, type, value) => {
    const updated = [...product[type]];
    updated[index] = value;
    setProduct({ ...product, [type]: updated });
  };

  const addField = (type) => {
    setProduct({ ...product, [type]: [...product[type], ""] });
  };

  const removeField = (type, index) => {
    const updated = product[type].filter((_, i) => i !== index);
    setProduct({ ...product, [type]: updated });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (name === "mainImage") {
      const imageUrl = await uploadImage(files[0]);
      setProduct({ ...product, mainImage: imageUrl });
    } else if (name === "images") {
      const uploadedImages = await Promise.all(
        Array.from(files).map((file) => uploadImage(file))
      );
      setProduct({ ...product, images: uploadedImages });
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bedsheets");

    try {
      const res = await axios.post(`${Config.CLOUD_URL}`, formData);
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const generateProductCode = () => {
    const randomCode = Math.floor(Math.random() * 1000000);
    setProduct((prev) => ({
      ...prev,
      productCode: `P-${randomCode}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...product,
      mainImage: product.mainImage,
      allImages: product.images,
    };

    try {
      await axios.post(`${Config.react_domain}/api/product`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    generateProductCode();
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Brand:</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Product Code:</label>
            <input
              type="text"
              name="productCode"
              value={product.productCode}
              disabled
              className="form-control"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Short Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Full Description (descriptionAll):</label>
          <textarea
            name="descriptionAll"
            value={product.descriptionAll}
            onChange={handleChange}
            className="form-control"
          />
        </div>
   {/* Category and Fabric */}
   <div className="row">
          <div className="col-md-6 mb-3">
            <label>Category:</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Fabric Quality:</label>
            <input
              type="text"
              name="fabricQuality"
              value={product.fabricQuality}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        {/* Warranty / Quantity */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Warranty:</label>
            <input
              type="text"
              name="warranty"
              value={product.warranty}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Size (Dynamic Fields) */}
        <div className="mb-3">
          <label>Sizes:</label>
          {product.size.map((val, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                value={val}
                onChange={(e) =>
                  handleDynamicChange(index, "size", e.target.value)
                }
                className="form-control me-2"
              />
              <button
                type="button"
                onClick={() => removeField("size", index)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("size")}
            className="btn btn-secondary btn-sm"
          >
            + Add Size
          </button>
        </div>

        {/* Color (Dynamic Fields) */}
        <div className="mb-3">
          <label>Colors:</label>
          {product.color.map((val, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                value={val}
                onChange={(e) =>
                  handleDynamicChange(index, "color", e.target.value)
                }
                className="form-control me-2"
              />
              <button
                type="button"
                onClick={() => removeField("color", index)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("color")}
            className="btn btn-secondary btn-sm"
          >
            + Add Color
          </button>
        </div>

     

        {/* Images */}
        <div className="mb-3">
          <label>Main Image:</label>
          <input
            type="file"
            name="mainImage"
            onChange={handleFileChange}
            className="form-control"
          />
          {product.mainImage && (
            <img
              src={product.mainImage}
              alt="Main"
              className="mt-2"
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label>Other Images:</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            className="form-control"
          />
          {product.images.length > 0 && (
            <div className="mt-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Image ${idx + 1}`}
                  style={{ maxWidth: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
