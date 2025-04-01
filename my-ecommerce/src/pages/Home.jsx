import React from "react";
import BestSelling from "./BestSelling";
import HomeImg from "../assets/Images/Haven.jpg";
import Shop from "./Shop";
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  return (
    <>
      <div className="container-fluid" style={{ padding: "0", margin: "0" }}>
        <img 
          src={HomeImg} 
          alt="Home" 
          className="home-img" 
          style={{
            width: "100%", 
            height: "40vh", 
            objectFit: "cover"
          }} 
        />

        <BestSelling />
        <Shop name={"Flat Bedsheets"} />

<HomeCarousel />

        <Shop name={"Fitted Bedsheets"} />
        <Shop name={"Pillow Cases"} />
        <Shop name={"Bed Covers"} />
        <Shop name={"Sheet Sets"} />
        <Shop name={"Comforter Sets"} />
        <Shop name={"Bed Skirts"} />
        
        <Shop name={"Premium Comforter"} />
      </div>
    </>
  );
};

export default Home;
