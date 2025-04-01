import React from "react";
import Haven from "../assets/Images/Haven.jpg";
import HomeImg from "../assets/Images/Bed Skirt.jpg";
import Couple from "../assets/Images/Comforter Sets.jpg";

function HomeCarousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Carousel Indicators */}
      <ul className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" />
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" />
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" />
      </ul>

      {/* Carousel Images */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={Haven} alt="First slide" style={{ height: "700px" }} />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={HomeImg} alt="Second slide" style={{ height: "700px" }} />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Couple} alt="Third slide" style={{ height: "700px" }} />
        </div>
      </div>

      {/* Previous Button */}
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>

      {/* Next Button */}
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default HomeCarousel;
