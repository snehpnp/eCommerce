import React from "react";
import Shop from "./Tabs/Shop";
import HomeCarousel from "./Tabs/HomeCarousel";

const Home = () => {
  return (
    <>
      <div className="container-fluid" style={{ padding: "0", margin: "0" }}>
        <img
          src={
            "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/Haven_fcusgq.jpg"
          }
          alt="Home"
          className="home-img"
          style={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
          }}
        />

        {/* <BestSelling /> */}
        <Shop name={"Flat Bedsheets"} home={true}/>

        <HomeCarousel />

     
      </div>
    </>
  );
};

export default Home;
