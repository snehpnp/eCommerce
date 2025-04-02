import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    brand: '',
    productCode: '',  // Will be generated automatically
    description: '',
    warranty: '',
    quantity: '',
    size: '',
    category: '',
    color: '',
    fabricQuality: '',
    mainImage: null,
    images: []
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image upload
  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (name === 'mainImage') {
      const imageUrl = await uploadImage(files[0]);
      setProduct({ ...product, mainImage: imageUrl });
    } else if (name === 'images') {
      const uploadedImages = await Promise.all(
        Array.from(files).map((file) => uploadImage(file))
      );
      setProduct({ ...product, images: uploadedImages });
    }
  };

  // Function to upload image to Cloudinary and get the URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'bedsheets');  // Replace with your upload preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkqw7zkzl/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      return res.data.secure_url;  // Cloudinary will return the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Generate a random product code
  const generateProductCode = () => {
    const randomCode = Math.floor(Math.random() * 1000000); // Random 6-digit code
    setProduct((prevProduct) => ({
      ...prevProduct,
      productCode: `P-${randomCode}` // Prefixed with "P-"
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the product data (now including URLs for images)
    const productData = {
      ...product,
      mainImage: product.mainImage,
      allImages: product.images
    };

    // Send the normal request body (JSON)
    try {
      const response = await axios.post('http://localhost:5000/api/product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  // Automatically generate product code when the component is mounted
  useEffect(() => {
    generateProductCode();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
            <label>Product Price:</label>
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
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
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
        </div>
        <div className="row">
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
          <div className="col-md-6 mb-3">
            <label>Size:</label>
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
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
        <div className="mb-3">
          <label>Main Image:</label>
          <input
            type="file"
            name="mainImage"
            onChange={handleFileChange}
            required
            className="form-control"
          />
          {product.mainImage && <img src={product.mainImage} alt="Main" className="mt-2" style={{ maxWidth: '200px' }} />}
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
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`Other Image ${index + 1}`} style={{ maxWidth: '100px', margin: '5px' }} />
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
