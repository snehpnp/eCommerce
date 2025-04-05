// Favorite.js
import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux"; // ya context/state if you're using that
import Card from "../Tabs/Card"; // your existing card component

const Favorite = () => {
    
  const products = useSelector((state) => state.products.all); // all products
  const likes = useSelector((state) => state.products.likes);  // liked items by _id
  const GetProducts = async () => {
    try {
      const response = await axios.get(`${Config.react_domain}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);


  const likedProducts = products.filter(
    (product) => likes[product._id] === true
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>❤️ Favorite Products</h2>

      {likedProducts.length === 0 ? (
        <p>No favorite products yet. Start liking some!</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "flex-start",
          }}
        >
          {likedProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
