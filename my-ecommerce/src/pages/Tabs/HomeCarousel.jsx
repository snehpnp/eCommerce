import React from "react";
import Haven from "../../assets/Images/Haven.jpg";
import HomeImg from "../../assets/Images/Bed Skirt.jpg";
import Couple from "../../assets/Images/Comforter Sets.jpg";

function HomeCarousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Carousel Indicators */}
      <ul className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" />
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" />
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" />
      </ul>

      {/* Carousel Items */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={Haven} alt="First slide" style={{ height: "700px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 style={{ fontWeight: "bold" }}>Welcome to Haven</h2>
            <p>Experience comfort like never before with our premium collection.</p>
            {/* <button className="btn btn-light">Shop Now</button> */}
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={HomeImg} alt="Second slide" style={{ height: "700px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 style={{ fontWeight: "bold" }}>Elegant Bed Skirts</h2>
            <p>Upgrade your bedroom with timeless beauty.</p>
            {/* <button className="btn btn-outline-light">Explore</button> */}
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Couple} alt="Third slide" style={{ height: "700px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 style={{ fontWeight: "bold" }}>Couple Comforter Sets</h2>
            <p>Soft, cozy, and made for love.</p>
            {/* <button className="btn btn-warning">Buy Now</button> */}
          </div>
        </div>
      </div>

      {/* Controls */}
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
}

export default HomeCarousel;
