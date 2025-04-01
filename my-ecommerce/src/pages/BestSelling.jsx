import React from "react";
import Sheets from "../assets/Images/Sheets.jpg";
import PillowCase from "../assets/Images/Pillow Case.jpg";
import BedSkirt from "../assets/Images/Bed Skirt.jpg";
import ComComforterSets from "../assets/Images/Comforter Sets.jpg";
import  MattressProtector from "../assets/Images/Mattress Protector.jpg";
import  DurtComver from "../assets/Images/Duvet Cover.jpg";

function BestSelling() {
  const cachedData = [
    {
      category: "Sheets",
      images: Sheets,
    },
    {
      category: "Pillow Case",
      images: PillowCase,
    },
    {
      category: "Bed Skirt",
      images: BedSkirt,
    },
    {
      category: "Duvet Cover",
      images: DurtComver,
    },
    {
      category: "Comforter Sets",
      images: ComComforterSets,
    },
    {
      category: "Mattress Protector",
      images: MattressProtector,
    },
  ];

  return (
    <>
      <div
        className="container-fluid"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <h4 style={{ textAlign: "center" }}><strong>Our Best Selling Collections</strong></h4>
        <div className="image-container">
          {cachedData.map((category, index) => (
            <div key={index} className="image-box">
              <div className="image-wrapper">
                <img
                  src={category.images}
                  alt="Best Selling"
                  className="image--cover"
                />
              </div>
              <h6 style={{ textAlign: "center", marginTop: "10px" }}>
                {category.category}
              </h6>
            </div>
          ))}
        </div>

        <style>
          {`
          .image-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
          }

          .image-box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .image-wrapper {
            width: 250px; /* Increased size */
            height: 220px; /* Increased size */
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 50%;
            border: 4px solid #ddd;
          }

          .image--cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        `}
        </style>
      </div>
    </>
  );
}

export default BestSelling;
