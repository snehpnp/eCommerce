import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...product,
      mainImage: product.mainImage,
      allImages: product.images,
    };

    try {
      await axios.put(`${Config.react_domain}/api/products/${id}`, productData);
      toast.success("Product updated successfully");
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch failed", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/products/${id}`);
      const data = res.data;
      setProduct({
        ...data,
        size: data.size || [""],
        color: data.color || [""],
        images: data.allImages || [],
        mainImage: data.mainImage || null,
      });
    } catch (error) {
      console.error("Product fetch failed", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Name */}
          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} />
          </div>

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label>Price</label>
            <input type="text" name="price" className="form-control" value={product.price} onChange={handleChange} />
          </div>

          {/* Brand */}
          <div className="col-md-6 mb-3">
            <label>Brand</label>
            <input type="text" name="brand" className="form-control" value={product.brand} onChange={handleChange} />
          </div>

          {/* Product Code */}
          <div className="col-md-6 mb-3">
            <label>Product Code</label>
            <input type="text" name="productCode" className="form-control" value={product.productCode} onChange={handleChange} />
          </div>

          {/* Warranty */}
          <div className="col-md-6 mb-3">
            <label>Warranty</label>
            <input type="text" name="warranty" className="form-control" value={product.warranty} onChange={handleChange} />
          </div>

          {/* Quantity */}
          <div className="col-md-6 mb-3">
            <label>Quantity</label>
            <input type="number" name="quantity" className="form-control" value={product.quantity} onChange={handleChange} />
          </div>

          {/* Fabric Quality */}
          <div className="col-md-6 mb-3">
            <label>Fabric Quality</label>
            <input type="text" name="fabricQuality" className="form-control" value={product.fabricQuality} onChange={handleChange} />
          </div>

          {/* Category */}
          <div className="col-md-6 mb-3">
            <label>Category</label>
            <select name="category" className="form-select" value={product.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={product.description} onChange={handleChange}></textarea>
        </div>

        {/* Full Description */}
        <div className="mb-3">
          <label>Full Description</label>
          <textarea name="descriptionAll" className="form-control" value={product.descriptionAll} onChange={handleChange}></textarea>
        </div>

        {/* Size Fields */}
        <div className="mb-3">
          <label>Size</label>
          {product.size.map((sz, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" value={sz} onChange={(e) => handleDynamicChange(index, "size", e.target.value)} />
              <button type="button" className="btn btn-danger" onClick={() => removeField("size", index)}>X</button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={() => addField("size")}>+ Add Size</button>
        </div>

        {/* Color Fields */}
        <div className="mb-3">
          <label>Color</label>
          {product.color.map((cl, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" value={cl} onChange={(e) => handleDynamicChange(index, "color", e.target.value)} />
              <button type="button" className="btn btn-danger" onClick={() => removeField("color", index)}>X</button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={() => addField("color")}>+ Add Color</button>
        </div>

        {/* Main Image */}
        <div className="mb-3">
          <label>Main Image</label>
          <input type="file" name="mainImage" className="form-control" onChange={handleFileChange} />
          {product.mainImage && <img src={product.mainImage} alt="Main" height={80} className="mt-2" />}
        </div>

        {/* Other Images */}
        <div className="mb-3">
          <label>Other Images</label>
          <input type="file" name="images" className="form-control" multiple onChange={handleFileChange} />
          <div className="d-flex gap-2 mt-2 flex-wrap">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`img-${index}`} height={80} />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-success">Update Product</button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditProduct;
