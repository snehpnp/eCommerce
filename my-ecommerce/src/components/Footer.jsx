import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "40px 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div style={{ minWidth: "200px", marginBottom: "20px" }}>
          <h4 style={{ borderBottom: "2px solid #ff5151", paddingBottom: "5px" }}>
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>About Us</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Our Services</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Affiliate Program</a></li>
          </ul>
        </div>
        <div style={{ minWidth: "200px", marginBottom: "20px" }}>
          <h4 style={{ borderBottom: "2px solid #ff5151", paddingBottom: "5px" }}>
            Get Help
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>FAQ</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Shipping</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Returns</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Order Status</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Payment Options</a></li>
          </ul>
        </div>
        <div style={{ minWidth: "200px", marginBottom: "20px" }}>
          <h4 style={{ borderBottom: "2px solid #ff5151", paddingBottom: "5px" }}>
            Online Shop
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Watch</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Bag</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Shoes</a></li>
            <li><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Dress</a></li>
          </ul>
        </div>
        <div style={{ minWidth: "200px", marginBottom: "20px" }}>
          <h4 style={{ borderBottom: "2px solid #ff5151", paddingBottom: "5px" }}>
            Follow Us
          </h4>
          <div>
            <a href="#" style={{ color: "#ff5151", margin: "0 10px", fontSize: "20px" }}>
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" style={{ color: "#ff5151", margin: "0 10px", fontSize: "20px" }}>
              <i className="fab fa-twitter" />
            </a>
            <a href="#" style={{ color: "#ff5151", margin: "0 10px", fontSize: "20px" }}>
              <i className="fab fa-instagram" />
            </a>
            <a href="#" style={{ color: "#ff5151", margin: "0 10px", fontSize: "20px" }}>
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
      <p style={{ marginTop: "20px", fontSize: "14px" }}>© 2024 Your Company. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;