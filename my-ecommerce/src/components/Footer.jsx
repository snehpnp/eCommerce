import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Company */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase border-bottom border-danger pb-2">Company</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none d-block py-1">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Our Services</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Get Help */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase border-bottom border-danger pb-2">Get Help</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none d-block py-1">FAQ</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Shipping</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Order Status</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Payment Options</a></li>
            </ul>
          </div>

          {/* Online Shop */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase border-bottom border-danger pb-2">Online Shop</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Bed Skirt</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Comforter Sets</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Pillow Covers</a></li>
              <li><a href="#" className="text-white text-decoration-none d-block py-1">Curtains</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase border-bottom border-danger pb-2">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start mt-3">
              <a href="#" className="text-danger fs-5 me-3"><FaFacebookF /></a>
              <a href="#" className="text-danger fs-5 me-3"><FaTwitter /></a>
              <a href="#" className="text-danger fs-5 me-3"><FaInstagram /></a>
              <a href="#" className="text-danger fs-5 me-3"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center pt-3 border-top border-secondary mt-4">
          <small>© 2024 Your Company. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
